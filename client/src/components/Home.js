import React from 'react';
import styled from 'styled-components';
import Contacts from './contacts/Contacts';

const Home = () => (
   <Wrapper>
    Web Development Work Tracker
    <Contacts />
   </Wrapper>
)

const Wrapper = styled.div`
  padding: 1rem;
`
export default Home