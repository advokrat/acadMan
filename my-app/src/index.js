import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './custom.scss';
import App from './App';

document.body.style.height = "100vh";
document.body.style.minHeight = "100vh";


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
