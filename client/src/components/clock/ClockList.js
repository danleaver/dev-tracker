import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PunchCard from './PunchCard';
import DailyTotal from './DailyTotal';

const ClockList = ({newClock, ...props}) => {
  const [ clockList, setClockList ] = useState(null);

  useEffect(() => {
    let arr = []
    axios.get('/api/clocks')
      .then(res => {
        res.data.map(clock => {
          if (clock.time_out){
            arr.push(clock)
          }
        })
        setClockList(arr)
      })
      .catch(err => {
        console.log(err)
        setClockList([])
      })
  }, [])

  useEffect(() => {
    if (newClock) {
      setClockList([newClock, ...clockList])
    }
  }, [newClock])

  return (
   <Wrapper>
    { clockList && (clockList.length === 0) && "Nothing to see here.."} 
    {clockList && 
      <>
        <DailyTotal clockList={clockList}/>
        {clockList.map(clock => (
          <PunchCard key={clock.id} clock={clock}/>
        ))}
      </>
    }
   </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 1rem;
`
export default ClockList