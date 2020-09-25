import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import  useMsToHMS  from '../../hooks/useMsToHMS';


const DailyTotal = () => {
  const [ clockList, setClockList ] = useState([]);
  const [ total, setTotal ] = useState();
  const { convertReadable } = useMsToHMS();

  const end_date = new Date().toISOString()
  const start_date = new Date().toISOString()

  let currentClocks = []
  let arr = []

  useEffect(() => {
    axios.get(`/api/search_range/?start_date=${start_date}&end_date=${end_date}`)
      .then(res => {
        console.log(res.data)
        res.data.map(clock => {
          if (clock.time_out){
            currentClocks.push(clock)
          }
        })
        currentClocks.map(clock => {
          console.log("hitting map")
          arr.push(new Date(clock.time_out) - new Date(clock.time_in))
        })
        const sum = arr.reduce((a,b) => {
          return a + b
        }, 0)
    
        setTotal(convertReadable(sum))
        setClockList(currentClocks)
      })
      .catch(console.log)


  }, [])

  useEffect(() => {

  }, [clockList])

    return (
      <Wrapper>
            Daily Total: {total}
            {clockList.map(clock => (
        
                <Flex>
                  {clock.time_in}
                  <Spacer width={"100px"} />
                  {clock.time_out}
                </Flex>
              
            ))}
      </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 1rem;
`
const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`
const Spacer = styled.div`
  width: ${props => props.width};
`
export default DailyTotal