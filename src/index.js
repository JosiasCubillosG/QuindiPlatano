import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./app/components/routes";
import Context from './app/Context'
import 'react-toastify/dist/ReactToastify.css';
import * as serviceWorker from './serviceWorker';
import * as Subscription from './subscription'

ReactDOM.render(
  <Context.Provider>
      <Routes/>   
  </Context.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
Subscription.subscribeUser();

