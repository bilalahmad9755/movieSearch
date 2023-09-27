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
  apiKey: "abc",
  authDomain: "abc",
  projectId: "abc",
  storageBucket: "abc",
  databaseURL:"https://abc-abc-default-rtdb.firebaseio.com/",
  messagingSenderId: "abc",
  appId: "1:abc:web:abc",
  measurementId: "abc"
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
