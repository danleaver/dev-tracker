import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const PunchCard = ({clock, ...props}) => {



  return (
   <Wrapper>
     In: {new Date(clock.time_in).toLocaleString()}
     <StyledDiv/>
     Out: {clock.time_out && new Date(clock.time_out).toLocaleString()}
   </Wrapper>
  )
}

const StyledDiv = styled.div`
  width: 30px;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: space-between;
  padding: 1rem;
  // width: 500px;
`
export default PunchCard