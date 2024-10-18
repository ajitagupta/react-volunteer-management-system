import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Optional, if you want to style the app
import App from './App.js';  // Main App component
import reportWebVitals from './reportWebVitals';  // Optional

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional performance monitoring
reportWebVitals();
