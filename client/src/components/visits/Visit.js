import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import VisitForm from './VisitForm';

const Visit = ({visit, contact, ...props}) => {
  const [ editing, setEditing ] = useState(false);


  const handleClick = () => {
    axios.delete(`/api/contacts/${contact.id}/visits/${visit.id}`)
      .then(res => {
        props.removeVisit(visit.id)
      })
      .catch(console.log)
  }
  
  const toggleEdit = () => {
    setEditing(!editing)
  }

  return (
   <Wrapper>
      {visit.date.split("T")[0]} {/* shouldn't need the split */}
      <br/>
      {visit.details} 
      <div>
      <button onClick={handleClick}>Delete</button>
      <button onClick={toggleEdit}>Edit</button>
    </div>   
    {editing && <VisitForm contact={contact} visit={visit} updateVisit={props.updateVisit} setEditing={setEditing}/> }

   </Wrapper>
  )
}



const Wrapper = styled.div`
  padding: 1rem;
  

`
export default Visit