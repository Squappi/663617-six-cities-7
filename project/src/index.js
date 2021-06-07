import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const CARDS = 5;

ReactDOM.render(
  <React.StrictMode>
    <App cardsCount = {CARDS} />
  </React.StrictMode>,
  document.getElementById('root'));
