import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Suspense } from 'react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={null}>
    <App />
  </Suspense>
);

reportWebVitals();
