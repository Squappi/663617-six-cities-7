import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {Provider} from 'react-redux';
import {ActionCreator} from './store/action';
import { axiosLoadOffers, checkAuth } from './servies/api-actions';
import { createApi } from './servies/api';
import { AuthorizationStatus } from './const';
import { redirect } from './components/middlewares/redirect';
import rootReducer from './store/root-reducer/root-reducer';
import {configureStore} from '@reduxjs/toolkit';
const api = createApi(
  () => store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

store.dispatch(checkAuth());
store.dispatch(axiosLoadOffers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
