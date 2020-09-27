import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Contact from './Contact'
import ContactForm from './ContactForm';

const Contacts = () => {
  const [ contacts, setContacts ] = useState([]);

  useEffect(() => {
    axios.get('/api/contacts/')
    .then( res => {
      setContacts(res.data)
    })
    .catch(console.log)
  }, [])

  const addContact = (newContact) => {
    setContacts(contacts.concat(newContact))
  }

  const removeContact = (contactId) => {
    setContacts(contacts.filter( a => a.id !== contactId))
  }

  const updateContact = (updatedContact) => {
    setContacts(contacts.map( a => {
      if (a.id === updatedContact.id) {
        return updatedContact
      } else return a
    }))
  }

  return (
   <Wrapper>
     <ContactForm addContact={addContact} />
     {contacts.map(contact => (
       <Contact key={contact.id} contact={contact} removeContact={removeContact} updateContact={updateContact} />
     ))}
    
   </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 1rem;
`

export default Contacts