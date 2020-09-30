import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Task = ({currentCard:card, ...props}) => {

  const [ name, setName ] = useState("");
  const [ details, setDetails ] = useState("");

  // useEffect(() => {
  //   axios.get(`/api/cards/${card.id}/tasks`)
  // }, [])
  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post(`/api/cards/${card.id}/tasks`, {card_id: card.id, name, details})
      .then(res => console.log(res))
      .catch(console.log)
  }


  return (
   <Wrapper>
  HELLO Task
    {}
    <form onSubmit={handleSubmit}>
      <input placeholder="Task" name="name" value={name} onChange={(e)=>setName(e.target.value)} />
      <input placeholder="Details" name="details" value={details} onChange={(e)=>setDetails(e.target.value)} />
      <input type="submit" value="Submithz"/>
    </form>
   </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 1rem;
`
export default Task;