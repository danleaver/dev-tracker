import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import TimeIn from './TimeIn';
import ClockList from './ClockList';

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
    if (currentClock && !currentClock.time_out) { //if there is a clockIn, and no clockOut
      setClockedIn(true)
      let d = new Date(currentClock.time_in).toLocaleString()
      setStartTime(d)
    } else {                      //this is what happens when you clock out
      setClockedIn(false)
    }
  }, [currentClock])

  const toggleClock = () => {
    if (!clockedIn) {
      axios.post('/api/clocks', {time_in: new Date()}) //clocking IN
        .then(res => setCurrentClock(res.data))
        .catch(console.log)
    } else {
      axios.patch(`api/clocks/${currentClock.id}`, {time_out: new Date()}) //clocking OUT
        .then(res => {
          setCurrentClock(null)
          updateClockList(res.data) 
        })
        .catch(console.log)
    }
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
      <ButtonDiv>
        <button onClick={toggleHistory}>History</button>
      </ButtonDiv>
    {showHistory && <ClockList newClock={newClock}/> }
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