import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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

    //create weeks from dates
    splitDates.map(item => {
      console.log("DATES!!", item.date)
      console.log("THE THING:", getWeekNumber(new Date(item.date)))
    })


    console.log(getWeekNumber(new Date()))  
    //push dates into respective weeks
  }, [])

  function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
  }
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