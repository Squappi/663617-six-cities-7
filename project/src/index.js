import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import comments from './mocks/review';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import offers from './mocks/offers';
import {reducer} from './store/reduсer';
import {ActionCreator} from './store/action';

const store = createStore(
  reducer,
  composeWithDevTools(),
);

store.dispatch(ActionCreator.loadOffers(offers));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        comments = {comments}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
