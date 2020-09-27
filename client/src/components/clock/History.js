import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import PunchCard from './punchcard/PunchCard';
import HistoryByPage from './HistoryByPage';

const History = ({newCard, ...props}) => {
  const [ cards, setCards ] = useState(null);

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
    })
    )
  }

  const renderCards = () => {
    const k = cards.length
    let resultsPerPage = 10
    let numOfPages = Math.floor(k/resultsPerPage) + (k % resultsPerPage > 0 && 1)
    let arr = Array.from(Array(numOfPages), () => []);
    for (let i = 0; i < numOfPages; i++){
      for (let j = 0; j < resultsPerPage; j++) {
        arr[i].push(cards[j+resultsPerPage*i])
      }
    }
    arr[numOfPages -1].splice(-(k % resultsPerPage))

    return(
      <>
        <HistoryByPage arr={arr} updatePunchCard={updatePunchCard}/>
        {/* <br />
        <br />
        <br />
        {cards.map(clock => (
          <PunchCard key={clock.id} clock={clock} updatePunchCard={updatePunchCard}/>
        ))} */}
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