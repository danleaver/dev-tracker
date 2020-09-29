import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PunchCard from './punchcard/PunchCard';

const HistoryByPage = ({arr, ...props}) => {
  const [ page, setPage ] = useState(0);
  let currentPage = parseInt(page)+1
  const prevPosition = usePrevious((currentPage - 1)/arr.length);
  const totalPages = arr.length
  const startingPlace = currentPage*props.resultsPerPage-props.resultsPerPage + 1
  const endingPlace = currentPage*props.resultsPerPage

  useEffect(() => {
      prevPosition && setPage(Math.floor(prevPosition*totalPages+1)-1)
  },[props.resultsPerPage])

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const handleClick = (e) => setPage(e.target.name);



  return (
    <Wrapper>
      {arr[page] && arr[page].map( (card, j) => (
        <PunchCard card={card} key={j} removeCard={props.removeCard} updatePunchCard={props.updatePunchCard}/>
      ))}
      <Flex>
        {arr.map((p, i) => (
          <div key={i}>
            {(page == i)
              ?
              `Page ${i+1}` 
              :
              <button name={i} onClick={handleClick}>page {i+1}</button>
            } 
          </div>
        ))}
      </Flex>
      <div>
        showing results {startingPlace} through {endingPlace < props.cards.length ? endingPlace : props.cards.length} out of {props.cards.length} results
      </div>
    </Wrapper>
  )
}

const Flex = styled.div`
  display: flex;
  justify-content: center;
`
const Wrapper = styled.div`
  padding: 1rem;
`
export default HistoryByPage