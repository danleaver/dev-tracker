import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ContactForm = ({contact, ...props}) => {
  const [ values, setValues ] = useState({ 
      name: contact ? contact.name : "",
      phone: contact ? contact.phone : "",
      url: contact ? contact.url : "",
      details: contact ? contact.details : "",
    })

  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setValues({...values, [name]: value})
  }  

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (contact) {
      axios.patch(`/api/contacts/${contact.id}`, {...values})
        .then(res => {
          props.updateContact(res.data)
          props.setEditing(false)
        })
        .catch(console.log)
    } else {
      axios.post('/api/contacts', {...values})
        .then(res => {
          props.addContact(res.data)
          setValues({
            name: "",
            phone: "",
            url: "",
            details: "",
          })
        })
        .catch(console.log)
    }
  }

  return (
   <Wrapper>
    <strong>
      {contact ? "Editing" : "New"} Contact
    </strong>
    <form onSubmit={handleSubmit}> 
      <label>Name</label>
      <input type="text" name="name" value={values.name} onChange={handleChange}/>
      <div>
        <label>Phone</label>
        <input type="text" name="phone" value={values.phone} onChange={handleChange}/>
      </div>
      <div>
        <label>Url</label>
        <input type="text" name="url" value={values.url} onChange={handleChange}/>
      </div>
      <div>
        <label>Details</label>
        <textarea name="details" value={values.details} onChange={handleChange}/>
      </div>
      <div>
        <input type="submit"></input>
      </div>
    </form>
   </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 1rem;
`

export default ContactForm