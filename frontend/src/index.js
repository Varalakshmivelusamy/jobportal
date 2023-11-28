// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


// reportWebVitals();



import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './util/redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider  clientId="575986163479-9pglu9vcjo67eo6up496p7sfn0nbnde7.apps.googleusercontent.com"  >
    <Provider store={store}>
      <React.StrictMode>
     
        <App />
        </React.StrictMode>
     
    </Provider>
    </GoogleOAuthProvider>
);

reportWebVitals();


