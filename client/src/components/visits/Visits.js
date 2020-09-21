import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Visit from './Visit';
import VisitForm from './VisitForm';

const Visits = ({contact, ...props}) => {
  const [ visits, setVisits ] = useState([]);
  useEffect(() => {
    // axios.post(`/api/contacts/${contact.id}/visits`, {details: "testing", contact_id: contact.id})
    //   .then(console.log)
    //   .catch(console.log)
    axios.get(`/api/contacts/${contact.id}/visits`)
      .then(res => setVisits(res.data))
      .catch(console.log)
  }, [])

  const removeVisit = (visitId) => {
    setVisits(visits.filter( a => a.id !== visitId))
  }

  const updateVisit = (updatedVisit) => {
    setVisits(visits.map( a => {
      if (a.id === updatedVisit.id) {
        return updatedVisit
      } else return a
    }))
  }

  const addVisit = (newVisit) => {
    setVisits(visits.concat(newVisit))
  }

  return (
   <Wrapper>
     HELLO Visits
     <VisitForm contact={contact} addVisit={addVisit}/>
    {visits.map(visit => (
      <Visit key={visit.id} visit={visit} contact={contact} removeVisit={removeVisit} updateVisit={updateVisit}/>
    ))}
   </Wrapper>
  )
}


const Wrapper = styled.div`
  padding: 1rem;
  padding-left: 10rem;

`
export default Visits