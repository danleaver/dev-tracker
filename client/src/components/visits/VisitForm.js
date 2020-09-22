import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const VisitForm = ({visit, contact, ...props}) => {
  let today = new Date().toISOString().split("T")[0]

  const [ values, setValues ] = useState({ 
      date: visit ? visit.date : today,
      details: visit ? visit.details : "",
      contact_id: contact.id
    })

  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setValues({...values, [name]: value})
  }  

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (visit) {
      axios.patch(`/api/contacts/${contact.id}/visits/${visit.id}`, {...values})
        .then(res => {
          props.updateVisit(res.data)
          props.setEditing(false)
        })
        .catch(console.log)
    } else {
      axios.post(`/api/contacts/${contact.id}/visits`, {...values})
        .then(res => {
          props.addVisit(res.data)
          setValues({
            ...values,
            date: today,
            details: "",
          })
        })
        .catch(console.log)
    }
  }

  return (
   <Wrapper>
    <strong>
      {visit ? "Editing" : "New"} Visit
    </strong>
    <form onSubmit={handleSubmit}> 
      <label>Date</label>
      <input type="date" name="date" value={values.date} onChange={handleChange}/>
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

export default VisitForm