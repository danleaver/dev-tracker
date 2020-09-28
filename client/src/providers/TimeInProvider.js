import React, { useState, useEffect } from 'react';

export const TimeInContext = React.createContext();

const TimeInProvider = (props) => {
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