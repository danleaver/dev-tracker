import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PunchCard from './punchcard/PunchCard';

const HistoryByPage = ({arr, ...props}) => {
  const [ page, setPage ] = useState(0);

  const handleClick = (e) => {
    setPage(e.target.name)
  }

  return (
   <Wrapper>
    {arr.map((p, i) => (
      <button name={i} onClick={handleClick}>page {i+1}</button>
    ))}
    {arr[page].map(card => (
      <PunchCard clock={card} key={card.id} updatePunchCard={props.updatePunchCard}/>
    ))}
   </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 1rem;
`
export default HistoryByPage