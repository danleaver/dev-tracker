import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import TimeIn from './TimeIn';
import History from './History';
import DailyTotal from './DailyTotal';

const Clock = () => {
  const [ currentClock, setCurrentClock ] = useState(null);
  const [ clockedIn, setClockedIn ] = useState(false);
  const [ startTime, setStartTime ] = useState(null);
  const [ newClock, setNewClock ] = useState(null);
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
      axios.post('/api/clocks', {time_in: new Date()}) 
        .then(res => setCurrentClock(res.data))
        .catch(console.log)
    } else checkRollOver();
  }

  let j = 0
  const checkRollOver = (timeIn = currentClock.time_in) =>{
    let time_in = new Date(timeIn).toLocaleDateString() 
    if (time_in === new Date().toLocaleDateString()) {
      clockOutRollover(new Date())
    } else if (j < 1000) { //prevent infinite loops
      let nextDay = new Date(time_in)
      nextDay.setDate(nextDay.getDate() + 1);
      let v = new Date(nextDay.getTime() - 1)
      j++
      clockOutRollover(v)
        .then(clockInRollOver(nextDay))
    }
  }

  const clockInRollOver = (midnight) => {
    axios.post('/api/clocks', {time_in: midnight}) 
      .then(res => checkRollOver(res.data.time_in))
      .catch(console.log)
  }

  let i = 0
  const clockOutRollover = (time_out) => {
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

  const updateClockList = (newClock) => {
    setNewClock(newClock)
    console.log("newCLock",newClock)
  }

  const toggleHistory = () => {
    setNewClock(null)
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
    {showHistory && <History newClock={newClock}/> }
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