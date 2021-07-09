import { AuthorizationStatus, SortType } from '../const';
import { sortList } from '../sorting';
import { ActionType } from './action';

const initialState = {
  city: 'Amsterdam',
  listOffers: [],
  cityOffers: [],
  sortType: SortType.POPULAR,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  isDataLoaded: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CITY_CHANGE:
      return {
        ...state,
        city: action.payload,
        sortType: SortType.POPULAR,
        cityOffers: sortList(state.listOffers.filter((offer) => offer.city.name === action.payload), SortType.POPULAR),
      };
    case ActionType.LIST_OF_OFFERS:
      return {
        ...state,
        listOffers: action.payload,
        cityOffers: sortList(action.payload.filter((offer) => offer.city.name === state.city), state.sortType),
      };
    case ActionType.SORT_CHANGE:
      return {
        ...state,
        sortType: action.payload,
        cityOffers: sortList(state.listOffers.filter((offer) => offer.city.name === state.city), action.payload),
      };
    case ActionType.LOAD_DATA_OFFERS:
      return {
        ...state,
        cityOffers: action.payload,
        isDataLoaded: true,
      };
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.LOGOUT:
      return {
        ...state,
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      };
    default:
      return state;
  }
};

export {reducer};
