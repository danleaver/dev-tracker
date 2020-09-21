import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ContactForm from './ContactForm';
import Visits from '../visits/Visits';

const Contact = ({contact, ...props}) => {
  const [ editing, setEditing ] = useState(false);
  const [ showVisits, setShowVisits ] = useState(false);

  const handleClick = () => {
    axios.delete(`/api/contacts/${contact.id}`)
      .then(res => {
        props.removeContact(contact.id)
      })
      .catch(console.log)
  }
  
  const toggleEdit = () => {
    setEditing(!editing)
  }

  const handleVisit = () => {
    setShowVisits(!showVisits)
  }

  return (
   <Wrapper>
     <Flex>
       <InfoLeft>
        <strong>
          {contact.name} 
        </strong>
        <div>
          <i>
            {contact.phone}
          </i>
        </div>
       </InfoLeft>
       <InfoRight>
         <a href={contact.url}>{contact.url}</a>

          <div>
           {contact.details}
          </div>
       </InfoRight>
     </Flex>

    <div>
      <button onClick={handleVisit}>Visits</button>
      {showVisits && <Visits contact={contact}/>}
    </div>
    <br />
    <div>
      <button onClick={handleClick}>Delete</button>
      <button onClick={toggleEdit}>Edit</button>
    </div>
  {editing && <ContactForm contact={contact} updateContact={props.updateContact} setEditing={setEditing}/> }
   </Wrapper>
  )
}
const InfoLeft = styled.div`
  width: 300px;
`

const InfoRight = styled.div`

  width: 300px;
`
const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

`
const Wrapper = styled.div`
  padding: 1rem;
  
`
export default Contact