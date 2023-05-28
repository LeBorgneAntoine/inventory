import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Application from './Application';

const root = ReactDOM.createRoot(document.getElementById('root'));



root.render( 
  <React.StrictMode>
    <div className='h-full w-full dark:bg-neutral-900 absolute'>
      
        <Application />
      
    </div>
   
  </React.StrictMode>
);

//reportWebVitals();
