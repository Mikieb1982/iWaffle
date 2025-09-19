import React from 'react';
import ReactDOM from 'react-dom/client';
// fix: Module '"file:///App"' has no default export. Use a named import instead.
import { App } from './App';
import './index.css'; // Assuming TailwindCSS is configured here

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);