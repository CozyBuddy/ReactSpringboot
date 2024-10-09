import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { RecoilRoot } from 'recoil';
import { Provider } from 'react-redux';
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>      
        <RecoilRoot>
     <App />
    </RecoilRoot>
    </Provider>  
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
