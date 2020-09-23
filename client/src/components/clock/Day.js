import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import  useMsToHMS  from '../../hooks/useMsToHMS';

const Day = ({day}) => {
  const [clocks, setClocks] = useState();
  const [ total, setTotal ] = useState();
  const { convertReadable } = useMsToHMS();
  
  useEffect(() =>{
    let arr = []

    day.clocks.map(clock => (
      arr.push(new Date(clock.time_out) - new Date(clock.time_in))
    ))

    const sum = arr.reduce((a,b) => {
      return a + b
    }, 0)

    setTotal(convertReadable(sum))
  }, [])

  return (
   <Wrapper>
      {day.date}
      <div>
        {total}
      </div>
   </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 1rem;
`
export default Day