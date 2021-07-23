import {AuthorizationStatus} from '../../const';
import {ActionType} from '../action';
import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
};

const user = createReducer(initialState, (builder) => {
  builder
    .addCase(ActionType.REQUIRED_AUTHORIZATION, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(ActionType.LOGOUT,(state, action) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
    });
});

export {user};
