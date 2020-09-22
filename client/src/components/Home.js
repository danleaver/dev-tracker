import React from 'react';
import styled from 'styled-components';
import Contacts from './contacts/Contacts';
import Clock from './clock/Clock';

const Home = () => (
   <Wrapper>
    Web Development Work Tracker
    <Clock/>
    <Contacts />
   </Wrapper>
)

const Wrapper = styled.div`
  padding: 1rem;
`
export default Home