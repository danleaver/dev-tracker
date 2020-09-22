import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const TimeIn = (props) => {
  const [totalTimeIn, setTotalTimeIn] = useState("");
  let time_in = new Date(props.currentClock.time_in)

  useEffect(()=>{
      timer()
    const newPeriod = setInterval(() => 
      timer(), 997
    )
    return () => clearInterval(newPeriod)
  }, [])

  function msToHMS(diff) {
    let seconds = parseInt((diff/1000) % 60),
      minutes = parseInt((diff/(1000 * 60)) % 60),
      hours = parseInt((diff/(1000 * 60 * 60)) % 24);
      seconds = (seconds < 10) ? "0" + seconds : seconds;
      if (hours > 0) {
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        return hours + ":" + minutes + ":" + seconds ;
      } else {
        return minutes + ":" + seconds ;
      }
  }

  const timer = () => {
      let diff = Date.now() - time_in
      setTotalTimeIn(msToHMS(diff))
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