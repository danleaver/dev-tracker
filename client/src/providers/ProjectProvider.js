import axios from 'axios';
import React, { useState, useEffect } from 'react';

export const ProjectContext = React.createContext();

const ProjectProvider = (props) => {
  const [ projects, setProjects ] = useState([]);

  useEffect(() => {
    console.log('in useEffect')
    axios.get(`/api/projects/`)
      .then(res => {
        setProjects(res.data)
        console.log(res.data)
      })
      .catch(console.log)
  }, [])

  return (
    <ProjectContext.Provider value={{
      projects,
      setProjects,
    }}>
      {props.children}
    </ProjectContext.Provider>
  )
}

export default ProjectProvider