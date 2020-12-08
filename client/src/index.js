import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import  TimeInProvider  from './providers/TimeInProvider';
import CardProvider from './providers/CardProvider';
import ProjectProvider from './providers/ProjectProvider';

ReactDOM.render(
  <React.StrictMode>
    <ProjectProvider>
      <TimeInProvider>
        <CardProvider>
          <App />
        </CardProvider>
      </TimeInProvider>
    </ProjectProvider>
  </React.StrictMode>,
  document.getElementById('root')
);