import React from 'react';
import ReactDOM from 'react-dom/client';
import '@ds/styles.css';
import './brand-theme.css';
import { Agentation } from 'agentation';
import { App } from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {import.meta.env.DEV && <Agentation endpoint="http://localhost:4747" />}
  </React.StrictMode>
);
