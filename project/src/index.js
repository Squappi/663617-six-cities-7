import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import cardsDescription from './mocks/offers';


ReactDOM.render(
  <React.StrictMode>
    <App
      cardsDescription = {cardsDescription}
    />
  </React.StrictMode>,
  document.getElementById('root'));
