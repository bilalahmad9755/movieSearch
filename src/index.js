import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import {client} from './graphQL/client';
import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';
import 'firebase/auth';
import './index.css';

const config = {
  apiKey: "AIzaSyAD7GWj5lEXdk-m7KJvvPN9J9oLGeEubtk",
  authDomain: "hellofirebase-1139c.firebaseapp.com",
  projectId: "hellofirebase-1139c",
  storageBucket: "hellofirebase-1139c.appspot.com",
  databaseURL:"https://hellofirebase-1139c-default-rtdb.firebaseio.com/",
  messagingSenderId: "673623807411",
  appId: "1:673623807411:web:f6b400522fe3e28a87e7c6",
  measurementId: "G-B6KQT5K7JN"
};
const app = initializeApp(config);
getDatabase(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
