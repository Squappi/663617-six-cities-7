import { ActionType } from './action';

const initialState = {
  town: 0,
  listOffers: 0,
};

const reduser = (state = initialState, action) => {
  switch(action.type) {
    case ActionType.CITY_CHANGE:
      return {
        ...state,
        town: state.town,
      };
    case ActionType.LIST_OF_OFFERS:
      return {
        ...state,
        listOffers: state.listOffers,
      };
    default:
      return state;
  }
};

export {reduser};
