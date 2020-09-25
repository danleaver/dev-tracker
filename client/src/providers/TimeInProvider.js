import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TimeIn from '../components/clock/TimeIn';

export const TimeInContext = React.createContext();

export const TimeInProvider = (props) => {
  const [ totalTimeIn, setTotalTimeIn ] = useState(0);
  
  return (
    <TimeInContext.Provider value={{
      totalTimeIn,
      setTotalTimeIn,
    }}>
      {props.children}
    </TimeInContext.Provider>
  )
}

export default TimeInProvider