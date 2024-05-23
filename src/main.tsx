import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App/App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter /*basename="/kts-food"*/>
      {' '}
      <App />
    </HashRouter>
  </React.StrictMode>,
);
