import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import cardsDescription from './mocks/offers';
import comments from './mocks/review';
import { reduser } from './store/reduser';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(
  reduser,
  composeWithDevTools(),
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        cardsDescription = {cardsDescription}
        comments = {comments}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
