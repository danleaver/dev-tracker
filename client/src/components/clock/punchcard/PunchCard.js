import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import EditPunchCard from './EditPunchCard';

const PunchCard = ({clock, ...props}) => {
  const [ editing, setEditing ] = useState(false);
  
  const handleClick = (e) => {
    setEditing(!editing)
  }

  return (
    <>
      <Wrapper>
        In: {new Date(clock.time_in).toLocaleString()}
        <StyledDiv/>
        Out: {clock.time_out && new Date(clock.time_out).toLocaleString()}
        <button onClick={handleClick}>Edit</button>
      </Wrapper>
      {editing && 
        <EditPunchCard 
          updatePunchCard={props.updatePunchCard} 
          setEditing={setEditing} 
          clock={clock}
        /> 
      }
    </>
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
`
export default PunchCard