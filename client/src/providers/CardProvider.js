import React, { useState } from 'react';

export const CardContext = React.createContext();

const CardProvider = (props) => {
  const [ currentCard, setCurrentCard ] = useState(null);
  const [ newCard, setNewCard ] = useState(null);

  return (
    <CardContext.Provider value={{
      currentCard,
      setCurrentCard,
      newCard,
      setNewCard,
    }}>
      {props.children}
    </CardContext.Provider>
  )
}

export default CardProvider