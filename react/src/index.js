import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Application from './Application';
import './i18n';
const root = ReactDOM.createRoot(document.getElementById('root'));



root.render( 
  <React.StrictMode>
    <Suspense fallback={<span>Loading...</span>}>
      <div className='h-full w-full duration-150 bg-white dark:bg-neutral-950 absolute overflow-hidden'>
        
        <Application />
      
      </div>
    </Suspense>
    
   
  </React.StrictMode>
);

//reportWebVitals();
