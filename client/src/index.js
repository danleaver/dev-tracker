import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import  TimeInProvider  from './providers/TimeInProvider';
import CardProvider from './providers/CardProvider';

ReactDOM.render(
  <React.StrictMode>
    <TimeInProvider>
      <CardProvider>
        <App />
      </CardProvider>
    </TimeInProvider>
  </React.StrictMode>,
  document.getElementById('root')
);