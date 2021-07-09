import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import comments from './mocks/review';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {ActionCreator} from './store/action';
import { reducer } from './store/reducer';
import thunk from 'redux-thunk';
import { axiosLoadOffers, checkAuth } from './servies/api-actions';
import { createApi } from './servies/api';
import { AuthorizationStatus } from './const';
import { redirect } from './components/middlewares/redirect';

const api = createApi(
  () => store.dispatch(ActionCreator.requireAuhtorization(AuthorizationStatus.NO_AUTH)),
);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ),
);

store.dispatch(checkAuth());
store.dispatch(axiosLoadOffers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        comments = {comments}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
