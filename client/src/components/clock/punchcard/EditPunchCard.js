import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

const EditPunchCard = (props) => {
  const clockIn = new Date(props.clock.time_in) 
  const clockOut = new Date(props.clock.time_out) 
  
  //time
  let hours = clockIn.getHours(),
  minutes = clockIn.getMinutes(),
  seconds = clockIn.getSeconds();
  
  let hours2 = clockOut.getHours(),
  minutes2 = clockOut.getMinutes(),
  seconds2 = clockOut.getSeconds();
  
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  
  hours2 = (hours2 < 10) ? "0" + hours2 : hours2;
  minutes2 = (minutes2 < 10) ? "0" + minutes2 : minutes2;
  seconds2 = (seconds2 < 10) ? "0" + seconds2 : seconds2;
  
  const time = hours + ":" + minutes + ":" + seconds
  const time2 = hours2 + ":" + minutes2 + ":" + seconds2
  
  //date
  let day = clockIn.getDate(),
  month = clockIn.getMonth() + 1,
  year = clockIn.getFullYear();
  
  let day2 = clockIn.getDate(),
  month2 = clockIn.getMonth() + 1,
  year2 = clockIn.getFullYear();
  
  day = (day < 10) ? "0" + day : day;
  month = (month < 10) ? "0" + month: month;
  day2 = (day2 < 10) ? "0" + day2 : day2;
  month2 = (month2 < 10) ? "0" + month2: month2;
  
  const date = year + "-" + month + "-" + day
  const date2 = year2 + "-" + month2 + "-" + day2
  
  const [ values, setValues ] = useState({ 
    time: time,
    time2: time2,
    date: date,
    date2: date2,
  })

  const [ finalValues, setFinalValues ] = useState({
    time_in: new Date(date + " " + time),
    time_out: new Date(date2 + " " + time2),
  })

  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value
    setValues({...values, [name]: value})

    switch (name) {
      case("time"):
        setFinalValues({...finalValues, time_in: new Date(values.date + " " + value)})
        break;
      case("date"):
        setFinalValues({...finalValues, time_in: new Date(value + " " + values.time)})
        break;
      case("time2"):
      setFinalValues({...finalValues, time_out: new Date(values.date2 + " " + value)})
        break;
      case("date2"):
        setFinalValues({...finalValues, time_out: new Date(value + " " + values.time2)})
        break;
        console.log(finalValues)
    }
  } 
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.patch(`/api/clocks/${props.clock.id}`, {...finalValues})
      .then(res => {
        props.updatePunchCard(res.data)
        props.setEditing(false)
      })
      .catch(console.log)
  }
  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <input type="date" name="date" value={values.date} onChange={handleChange}/>
        <input type="time" name="time" value={values.time} onChange={handleChange}/>
        <input type="date" name="date2" value={values.date2} onChange={handleChange}/>
        <input type="time" name="time2" value={values.time2} onChange={handleChange}/>
        <input type="submit" />
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-left 1rem;
`
export default EditPunchCard