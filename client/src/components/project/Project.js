import React, { useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ProjectContext } from '../../providers/ProjectProvider';

const Project = ({card, projectCard:pc, ...props}) => {
  const projectCard = pc[0];
  const { projects } = useContext(ProjectContext);
  const [ project, setProject ] = useState({name: "No Project"});
  const [ editing, setEditing ] = useState(false);

  // const projects = [
  //  { id: 1, name: "No Project" },
  //  { id: 2, name: "Jim's Bar" },
  //  { id: 3, name: "Joe's Pickle Factory" },
  //  { id: 4, name: "Carl's Warehouse" },
  // ] //Hardcode tmp
  
  useEffect(() => {
    console.log("PRJOCTE CARD", projectCard)
    if (projectCard == undefined) return;
    if (projectCard.project_id) {      
      axios.get(`/api/projects/${projectCard.project_id}`)
        .then(res => setProject(res.data))
        .catch(console.log)
    } else {
      
    }
  },[])

  const handleClick = () => {
    setEditing(!editing)
  }

  const deleteProjectCard = (newRes) => {
    if (projectCard == undefined) return;
    axios.delete(`/api/cards/${card.id}/project_cards/${projectCard.id}`)
      .then( deleteRes => { 
        props.setProjectCard(newRes)
      })
      .catch(console.log)
  }

  const handleChange = (e) => {
    // console.log(projectCard.length)
    let id = parseInt(e.target.value) + 1
    console.log("ID", id)
    axios.post(`/api/cards/${card.id}/project_cards/`, {project_id: id, card_id: card.id})
      .then(res => {
        
        setProject( projects[id - 1] )
        deleteProjectCard(res.data)
      })
      .catch(console.log)
  }

  return (
    <Wrapper>
      <ProjectDiv onClick={handleClick} >
        { project.name }
      </ProjectDiv>
        { editing && 
          <select type="select" name="project" onChange={handleChange}>
            {projects.map((project, index) => (
              <option key={index} value={index}> {project.name} </option>
            ))}
          </select>
        }
    </Wrapper>
  )
}

const ProjectDiv = styled.div`
  cursor: pointer;
`
const Wrapper = styled.div`
  // padding: 1rem;
`
export default Project