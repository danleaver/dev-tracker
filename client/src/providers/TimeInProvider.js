import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TimeIn from '../components/clock/TimeIn';

export const TimeInContext = React.createContext();

export const TimeInProvider = (props) => {
  const [ totalTimeIn, setTotalTimeIn ] = useState(0);
  const [ currentClock, setCurrentClock ] = useState(null);
  const [ newCard, setNewCard ] = useState(null);

  return (
    <TimeInContext.Provider value={{
      totalTimeIn,
      setTotalTimeIn,
      currentClock,
      setCurrentClock,
      newCard,
      setNewCard,
    }}>
      {props.children}
    </TimeInContext.Provider>
  )
}

export default TimeInProvider