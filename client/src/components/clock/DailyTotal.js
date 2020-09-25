import React, {useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import  useMsToHMS  from '../../hooks/useMsToHMS';
import { TimeInContext } from '../../providers/TimeInProvider';


const DailyTotal = () => {
  const context = useContext(TimeInContext);
  const [ clockList, setClockList ] = useState([]);
  const [ total, setTotal ] = useState();
  const [ sumState, setSumState ] = useState(null);
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
          arr.push(new Date(clock.time_out) - new Date(clock.time_in))
        })
        const sum = arr.reduce((a,b) => {
          return a + b
        }, 0)
  
        setTotal(convertReadable(sum))
        setSumState(sum)
        setClockList(currentClocks)
      })
      .catch(console.log)
  }, [])

  useEffect(() => {
    if (sumState){
      setTotal(convertReadable(sumState+context.totalTimeIn)) 
    }
  }, [context.totalTimeIn])

  
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