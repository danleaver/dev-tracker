import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Day from './Day';

const DailyTotal = (props) => {
  const [ newData, setNewData ] = useState([])
  const data = props.clockList
  let datesArr = []
  
  useEffect(() => {
    data.map( item => {
      let dateOut = new Date(item.time_out).toLocaleDateString()
      datesArr.push(dateOut)
    })

    const unique = datesArr.filter((v,i,a)=>a.indexOf(v)==i)
    let prevDateOut = unique[0]
    let finalArr = new Array(unique.length).fill().map(() => []);
    let i = 0

    data.map(item => {
      let dateOut = new Date(item.time_out).toLocaleDateString()
      if (dateOut === prevDateOut) {
        finalArr[i].push(item)
      } else if (dateOut !== prevDateOut) {
        i++
        finalArr[i].push(item)
        prevDateOut = unique[i]
      }
    })

    const splitDates = new Array(unique.length).fill().map(()=>[])
    for (let j=0; j < unique.length; j++) {
      splitDates[j] = {
        date: unique[j], 
        clocks: finalArr[j]
      }
    }

    setNewData(splitDates)
  }, [])

  return (
   <Wrapper>
    {newData.map(day => (
      <Day key={day.date} day={day}/>
    ))}
   </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 1rem;
`
export default DailyTotal