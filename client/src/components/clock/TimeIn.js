import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import useMsToHMS from '../../hooks/useMsToHMS';

const TimeIn = (props) => {
  const {convertTicker} = useMsToHMS();
  const [totalTimeIn, setTotalTimeIn] = useState("");
  const time_in = new Date(props.currentClock.time_in);

  useEffect(()=>{
      timer()
    const newPeriod = setInterval(() => 
      timer(), 997
    )
    return () => clearInterval(newPeriod)
  }, [])

  const timer = () => {
    let diff = Date.now() - time_in
    setTotalTimeIn(convertTicker(diff))
  }

  return (
    <Wrapper>
      {totalTimeIn}
    </Wrapper>
  )
}


const Wrapper = styled.div`
  padding: 0rem 1rem;
`
export default TimeIn