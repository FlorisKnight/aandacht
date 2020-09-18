importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');
firebase.initializeApp({
  apiKey: 'AIzaSyDNDULH6AkbibklV_PrHZTA5kDcizcj8yI',
  authDomain: 'attentionproject-766d5.firebaseapp.com',
  databaseURL: 'https://attentionproject-766d5.firebaseio.com',
  projectId: 'attentionproject-766d5',
  storageBucket: 'attentionproject-766d5.appspot.com',
  messagingSenderId: '1012598279900',
  appId: '1:1012598279900:web:e24bc767d6f06d0188ee19',
  measurementId: 'G-LG35CRXXLR'
});
const messaging = firebase.messaging();
