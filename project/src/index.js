import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import cardsDescription from './mocks/offers';
import comments from './mocks/review';


ReactDOM.render(
  <React.StrictMode>
    <App
      cardsDescription = {cardsDescription}
      comments = {comments}
    />
  </React.StrictMode>,
  document.getElementById('root'));
