import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import Client from './graphql/Client';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
  containerStyle: {
    zIndex: 1021
  }
}

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={ Client }>
      <AlertProvider template={ AlertTemplate } { ...options }>
        <App />
      </AlertProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
