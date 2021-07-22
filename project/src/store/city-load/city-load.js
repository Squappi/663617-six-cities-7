import { ActionType } from '../action';
import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  offer: [],
  listComments: null,
  nearby: [],
};

const cityLoad = createReducer(initialState, (builder) => {
  builder
    .addCase(ActionType.LOAD_OFFER,(state, action) => {
      state.offer = action.payload;
    })
    .addCase(ActionType.LIST_OF_COMMENTS, (state, action) => {
      state.listComments = action.payload;
    })
    .addCase(ActionType.LOAD_NEARBY, (state, action) => {
      state.nearby = action.payload;
    });
});

export {cityLoad};
