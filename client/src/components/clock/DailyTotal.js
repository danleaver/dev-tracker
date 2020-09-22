import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const DailyTotal = (props) => {
  const data = props.clockList
  
  useEffect(() => {
    data.map( item => {
      let outDate = new Date(item.time_out).toLocaleDateString()
      
      console.log(outDate)
      // if (item.toLocaleDateString())
    })
  }, [])
  return (
   <Wrapper>
  HELLO DailyTotal
   </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 1rem;
`
export default DailyTotal