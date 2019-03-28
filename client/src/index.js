import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Router from './Router';


ReactDOM.render(Router, document.getElementById('root'));
registerServiceWorker();
