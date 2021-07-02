import { SortType } from '../const';
import { ActionType } from './action';

const initialState = {
  city: 'Amsterdam',
  listOffers: [],
  cityOffers: [],
  sortType: SortType.POPULAR,
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case ActionType.CITY_CHANGE:
      return {
        ...state,
        city: action.payload,
        cityOffers: state.listOffers.filter((offer) => offer.city.name === action.payload),
      };
    case ActionType.LIST_OF_OFFERS:
      return {
        ...state,
        listOffers: action.payload,
        cityOffers: action.payload.filter((offer) => offer.city.name === state.city),
      };
    case ActionType.SORT_CHANGE:
      return {
        ...state,
        sortType: action.payload,
      };
    default:
      return state;
  }
};

export {reducer};
