import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import TimeIn from './TimeIn';
import History from './History';
import DailyTotal from './DailyTotal';
import { TimeInContext } from '../../providers/TimeInProvider';

const Clock = () => {
  const {currentClock, setCurrentClock, newCard, setNewCard, ...context} = useContext(TimeInContext);
  // const currentClock = context.currentClock;
  // const setCurrentClock = context.setCurrentClock;
  const [ clockedIn, setClockedIn ] = useState(false);
  const [ startTime, setStartTime ] = useState(null);
  // const [ newCard, setNewCard ] = useState(null);
  const [ showHistory, setShowHistory ] = useState(false);

  useEffect(()=>{
    axios.get('/api/search/clocks')
      .then(res=> {
        setCurrentClock(res.data[0])
      })
      .catch(console.log)
  }, [])

  useEffect(() => {
    if (currentClock && !currentClock.time_out) { 
      setClockedIn(true)
      let d = new Date(currentClock.time_in).toLocaleString()
      setStartTime(d)
    } else { 
      setClockedIn(false)
    }
  }, [currentClock])

  const toggleClock = () => {
    if (!clockedIn) {
      clockIn()
    } else checkRollOver();
  }

  let j = 0  
  const checkRollOver = (timeIn = currentClock.time_in) =>{
    let time_in = new Date(timeIn).toLocaleDateString() 
    if (time_in === new Date().toLocaleDateString()) {
      clockOut(new Date())
    } else if (j < 1000) { //prevent infinite loops debugging only
      let nextDay = new Date(time_in)
      nextDay.setDate(nextDay.getDate() + 1);
      let _1159pm = new Date(nextDay.getTime() - 1)
      j++
      clockOut(_1159pm)
      .then(clockInRollOver(nextDay))
    }
  }
  
  const clockInRollOver = (midnight) => {
    axios.post('/api/clocks', {time_in: midnight}) 
    .then(res => checkRollOver(res.data.time_in))
    .catch(console.log)
  }
  
  let i = 0

  const clockOut = (time_out) => {
    return new Promise((resolve, reject) => {
      axios.patch(`api/clocks/${currentClock.id + i}`, {time_out}) 
      .then(res => {
        i++
        setCurrentClock(null)
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
    axios.post('/api/clocks', {time_in: new Date()}) 
      .then(res => setCurrentClock(res.data))
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
      {currentClock && !currentClock.time_out && 
        <Flex>
            Start: {startTime}
            <TimeIn currentClock={currentClock}/>
        </Flex>
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
    {showHistory && <History newClock={newCard}/> }
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