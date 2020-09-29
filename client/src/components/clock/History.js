import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import HistoryByPage from './HistoryByPage';

const History = ({newCard, ...props}) => {
  const [ cards, setCards ] = useState(null);
  const [ resultsPerPage, setResultsPerPage ] = useState(10);
  
  useEffect(() => {
    axios.get('/api/clocks')
      .then(res => {
        setCards(res.data.filter(a => a.time_out))
      })
      .catch(err => {
        console.log(err)
        setCards([])
      })
  }, [])

  useEffect(() => {
    if (newCard) {
      setCards([newCard, ...cards])
    }
  }, [newCard])

  const updatePunchCard = (updatedClock) => {
    setCards(cards.map( a => {
      if (a.id === updatedClock.id) {
        return updatedClock
      } else return a
    }))
  }

  const removeCard = (id) => setCards(cards.filter(a => a.id !== id));
  
  const handleChange = (e) => {
    setResultsPerPage(e.target.value)
    renderCards()
  }

  const renderCards = () => {
    console.log("renderCards FIRED!!")
    const k = cards.length
    let rpp = resultsPerPage
    let numOfPages = Math.ceil(k/rpp)
    let arr = Array.from(Array(numOfPages), () => []);
    for (let i = 0; i < numOfPages; i++){
      for (let j = 0; j < rpp; j++) {
        arr[i].push(cards[j+rpp*i])
      }
    }

    k % rpp !== 0 && arr[numOfPages -1].splice(-(rpp - (k % rpp))) 

    return(
      <>
        <HistoryByPage arr={arr} removeCard={removeCard} updatePunchCard={updatePunchCard} resultsPerPage={resultsPerPage} cards={cards}/>
        Results Per Page:
        <select onChange={handleChange}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <input onChange={handleChange} placeholder="results per page" />
      </>
    )
  }
  return (
    <Wrapper>
      {cards &&
        cards.length 
          ? renderCards()
          : "Nothing to see here.."
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 1rem;
  `
  
export default History