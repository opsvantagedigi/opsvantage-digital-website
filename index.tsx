import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// GOVERNANCE: Legacy Grade Initialization
// Ensuring the root element exists before mounting to prevent runtime crashes.
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("CRITICAL FAILURE: Root element not found. OpsVantage initialization aborted.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);