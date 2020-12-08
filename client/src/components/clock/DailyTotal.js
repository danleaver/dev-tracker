import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import  useMsToHMS  from '../../hooks/useMsToHMS';
import { TimeInContext } from '../../providers/TimeInProvider';
import { CardContext } from '../../providers/CardProvider';
import CardDetails from '../card/CardDetails';


const DailyTotal = () => {
  const {currentCard, newCard, ...context} = useContext(CardContext);
  const {totalTimeIn} = useContext(TimeInContext);

  const [ cards, setCards ] = useState([]);
  const [ total, setTotal ] = useState();
  const [ sumState, setSumState ] = useState(0);
  const { convertReadable } = useMsToHMS();
  const end_date = new Date().toISOString();
  const start_date = end_date

  useEffect(() => {
    axios.get(`/api/search_range/?start_date=${start_date}&end_date=${end_date}`)
      .then(res => {
        // console.log("Daily Cards:", res.data)
        setCards(res.data)

        const sum = res.data.map(card => ( 
            card.time_out &&
              new Date(card.time_out) - new Date(card.time_in)
          )).reduce((a,b) => a + b )

        setTotal(convertReadable(sum))
        setSumState(sum)
      })
      .catch(console.log)
  }, [])

  useEffect(() => {
      setTotal(convertReadable(sumState+totalTimeIn)) 
  }, [totalTimeIn])

  useEffect(() => {
    if (currentCard && cards.length && currentCard.id !== cards[0].id){
      setCards([currentCard, ...cards])
    }
  }, [currentCard])

  useEffect(()=> {
    if (newCard){
      setCards(cards.map(a => {
        if (a.id === newCard.id){
          return newCard
        } 
        return a
      }))
    }
  }, [newCard])

  return (
    <Wrapper>
      Daily Total: {total}
      {cards.map((card, i) => (
        <Flex key={i}>
          <CardDetails currentCard={card} />
          {new Date(card.time_in).toLocaleTimeString()}
          <Spacer width={"100px"} />
          {card.time_out ? new Date(card.time_out).toLocaleTimeString() : "Clocked In :)" }
        </Flex>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 1rem;
`
const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`
const Spacer = styled.div`
  width: ${props => props.width};
`
export default DailyTotal