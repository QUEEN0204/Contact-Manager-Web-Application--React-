import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';


import './index.css';
import App from './App';

import {BrowserRouter} from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';

//bootstrap
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </StrictMode>
);


