import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const VisitForm = ({visit, contact, ...props}) => {


  const [ values, setValues ] = useState(
    
      { 
        date: visit ? visit.date : new Date().toLocaleString(),
        details: visit ? visit.details : "",
        contact_id: contact.id
      }
    
    )

  const handleChange = (e) => {
    // setName(e.target.value)
    // e.target.name
    let name = e.target.name
    let value = e.target.value
    console.log(name, value)
    // setValues(values.e.target.name, ...values)
    // setValues()
    setValues({...values, [name]: value})
  }  

  console.log(values)
  const handleSubmit = (e) => {
    
    e.preventDefault()
    
    if (visit) {

      // axios.patch(`/api/contacts/${contact.id}`, {name: name})
      axios.patch(`/api/contacts/${contact.id}/visits/${visit.id}`, {...values})

      .then(res => {
        props.updateVisit(res.data)
        props.setEditing(false)
      })
      .catch(console.log)
    } else {

      // axios.post('/api/contacts', {name: name})
      axios.post(`/api/contacts/${contact.id}/visits`, {...values})
        .then(res => {
          props.addVisit(res.data)
          // setName("")
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
      {visit ? "Editing" : "New"} Visit
    </strong>

    <form onSubmit={handleSubmit}> 
      <label>Date</label>
      <input type="date" name="date" value={values.name} onChange={handleChange}/>
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