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
    console.log(unique, datesArr, "UNIQUE AND DATES")
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

    //create array containing all week numbers from dates

    let weeksArr = []
    splitDates.map(item => {
      console.log("DATES!!", item.date)
      console.log("WEEk NUM AND YEAR ARR:", getWeekNumber(new Date(item.date)))
      weeksArr.push(getWeekNumber(new Date(item.date)));
    })
    

    console.log("Weeks arr",weeksArr)

    console.log(getWeekNumber(new Date()))  
    //push splitDates into weekArr

    console.log("split dates", splitDates)

    // const splitWeeks = new Array(week)
    
          //if getWEekNumber(splitDate) == weekArr
            //then for k ++ 
            // splitWeeks[k] = {
    //            week: weekArr[k]
            //          }
            // 
    //OPTION weeksArr[0] * 52 + weeksArr[1] gets unique values
    // --or simply need to find out how to filter duplicate arrays in an array
    let tmp = []
    const uniqueWeeks = weeksArr.filter(function (v) {
      if (tmp.indexOf(v.toString()) < 0) {
          tmp.push(v.toString());
          return v;
      }
    });

    
    const splitWeeks = {}

    console.log("UNIQUE WEEKS",uniqueWeeks)
    splitDates.forEach( item => {
      uniqueWeeks.forEach(week => {
        console.log(week, getWeekNumber(new Date(item.date)))
        if (week == getWeekNumber(new Date(item.date))) {
          console.log("YES IT IS EQUAL") //NOT HITTING THIS
          splitWeeks = {
            ...splitWeeks,
            week: getDateRangeOfWeek(week[1], week[0])
          }
        }
      })
    })
    //Okay I gotta stop here for the night.
    // - I'm not able to compare the two arrays 

    console.log(splitWeeks)
    
  }, [])
  
  Date.prototype.getWeek = function() {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  }
  
  function getDateRangeOfWeek(weekNo, y){
      var d1, numOfdaysPastSinceLastMonday, rangeIsFrom, rangeIsTo;
      d1 = new Date(''+y+'');
      numOfdaysPastSinceLastMonday = d1.getDay() - 1;
      d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
      d1.setDate(d1.getDate() + (7 * (weekNo - d1.getWeek())));
      rangeIsFrom = (d1.getMonth() + 1) + "-" + d1.getDate() + "-" + d1.getFullYear();
      d1.setDate(d1.getDate() + 6);
      rangeIsTo = (d1.getMonth() + 1) + "-" + d1.getDate() + "-" + d1.getFullYear() ;
      return rangeIsFrom + " to " + rangeIsTo;
  };

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