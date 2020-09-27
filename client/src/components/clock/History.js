import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PunchCard from './punchcard/PunchCard';

const History = ({newCard, ...props}) => {
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
    if (newCard) {
      setClockList([newCard, ...clockList])
    }
  }, [newCard])

  const updatePunchCard = (updatedClock) => {
    setClockList(clockList.map( a => {
      if (a.id === updatedClock.id) {
        return updatedClock
      } else return a
    })
    )
  }

  return (
   <Wrapper>
    { clockList && (clockList.length === 0) && "Nothing to see here.."} 
    {clockList && 
      <>
        {clockList.map(clock => (
          <PunchCard key={clock.id} clock={clock} updatePunchCard={updatePunchCard}/>
        ))}
      </>
    }
   </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 1rem;
`

export default History