import React from 'react';
import ReactDOM from 'react-dom';
import Routes from "./app/components/routes";
import Context from './app/Context'
import * as serviceWorker from './serviceWorker';

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

const PUBLIC_VAPID_KEY = 'BP9nxXZMVwFFIhUpVJ0xChXb0mfHz21HyXl51fizBlg8oYvFSGfuQxuGTIu5m35EGm1aIoHnbt9IAk2cuG0wQRc'

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
 
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
 
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const subscription = async() => {

  //Service worker
  const register = await navigator.serviceWorker.register('../public/worker.js',{
    scope: "/"
  });
  console.log('New service worker')

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
  })

  await fetch('/api/pushNotifications/subscription', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json"
    }
  })
  console.log('Subscribed!')
}

subscription()
