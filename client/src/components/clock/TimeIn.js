import React, {useEffect, useState, useContext} from 'react';
import styled from 'styled-components';
import useMsToHMS from '../../hooks/useMsToHMS';
import { TimeInContext } from '../../providers/TimeInProvider';
import { CardContext } from '../../providers/CardProvider';


const TimeIn = () => {
  const { convertTicker } = useMsToHMS();
  const { totalTimeIn, setTotalTimeIn } = useContext(TimeInContext);
  const context = useContext(CardContext);
  const time_in = new Date(context.currentCard.time_in);
  const [ timeInTicker, setTimeInTicker ] = useState();

  useEffect(()=>{
      timer()
    const newPeriod = setInterval(() => 
      timer(), 997
    )
    return () => clearInterval(newPeriod)
  }, [])

  const timer = () => {
    let diff = Date.now() - time_in
    setTotalTimeIn(diff)
    setTimeInTicker(convertTicker(diff))
  }

  return (
    <Wrapper>
      {timeInTicker}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 0rem 1rem;
`

export default TimeIn