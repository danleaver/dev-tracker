import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import TimeIn from './TimeIn';
import History from './History';
import DailyTotal from './DailyTotal';
import { CardContext } from '../../providers/CardProvider';
import CardDetails from '../card/CardDetails';

const Clock = () => {
  const { currentCard, setCurrentCard, newCard, setNewCard, ...context } = useContext(CardContext);
  const [ clockedIn, setClockedIn ] = useState(false);
  const [ startTime, setStartTime ] = useState(null);
  const [ showHistory, setShowHistory ] = useState(false);
  const [ project_id, setProjectId ] = useState(1);

  useEffect(()=>{
    axios.get('/api/search/cards')
      .then(res=> {
        setCurrentCard(res.data[0])
      })
      .catch(console.log)
  }, [])

  useEffect(() => {
    if (currentCard && !currentCard.time_out) { 
      setClockedIn(true)
      let d = new Date(currentCard.time_in).toLocaleString()
      setStartTime(d)
    } else { 
      setClockedIn(false)
    }
  }, [currentCard])

  const toggleClock = () => {
    if (!clockedIn) {
      clockIn()
    } else checkRollOver();
  }

  let j = 0  

  const checkRollOver = (timeIn = currentCard.time_in) =>{
    let time_in = new Date(timeIn).toLocaleDateString() 
    if (time_in === new Date().toLocaleDateString()) {
      clockOut(new Date())
    } else if (j < 1000) { //prevent infinite loops debugging only
      let nextDay = new Date(time_in)
      nextDay.setDate(nextDay.getDate() + 1);
      let _1159pm = new Date(nextDay.getTime() - 1)
      clockOut(_1159pm)
        .then(clockInRollOver(nextDay))
      j++
    }
  }
  
  const clockInRollOver = (midnight) => {
    axios.post('/api/cards', {time_in: midnight}) 
      .then(res => checkRollOver(res.data.time_in))
      .catch(console.log)
  }
  
  let i = -1

  const clockOut = (time_out) => {
    i++
    return new Promise((resolve, reject) => {
      axios.patch(`api/cards/${currentCard.id + i}`, {time_out}) 
        .then(res => {
          setCurrentCard(null)
          updateClockList(res.data) 
          resolve()
        })
        .catch(err => {
          console.log(err)
          reject()
        })
    })
  }
  
  const clockIn = () =>{
    axios.post('/api/cards', {time_in: new Date()}) 
      .then(res => setCurrentCard(res.data))
      .catch(console.log)
  }

  const updateClockList = (newCard) => {
    setNewCard(newCard)
    console.log("newCard",newCard) //
  }

  const toggleHistory = () => {
    setNewCard(null)
    setShowHistory(!showHistory)
  }
  return (
   <Wrapper>
      
      {currentCard && !currentCard.time_out && 
        <>
          <Flex>
          <CardDetails currentCard={currentCard}/>
              Start: {startTime}
              <TimeIn currentCard={currentCard}/>
          </Flex>
        </>
      }
      <ButtonDiv>
        <button onClick={toggleClock}>Clock {clockedIn ? "Out" : "In"}</button>
      </ButtonDiv>
      <div>
        <DailyTotal />
      </div>
      <div>
        HELLO WeeklyTotal
      </div>
      <ButtonDiv>
        <button onClick={toggleHistory}>History</button>
      </ButtonDiv>
    {showHistory && <History newCard={newCard}/> }

   </Wrapper>
  )
}

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const ButtonDiv = styled.div`
  padding: 1rem;
`
const Wrapper = styled.div`
  padding: 1rem;
`
export default Clock