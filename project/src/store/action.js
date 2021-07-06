import { AuthorizationStatus } from "../const";

export const ActionType = {
  LIST_OF_OFFERS: 'offers/listOfOffers',
  CITY_CHANGE: 'offers/cityChange',
  SORT_CHANGE: 'sort/sortChange',
  LOAD_DATA_OFFERS: 'data/loadDataOffers',
  REQUIRED_AUTHORIZATION: 'user/requiredAuthorization',
  LOGOUT: 'user/logout',
};


export const ActionCreator = {
  loadOffers: (offers) => ({
    type: ActionType.LIST_OF_OFFERS,
    payload: offers,
  }),
  changeCity: (city) => ({
    type: ActionType.CITY_CHANGE,
    payload: city,
  }),
  sortChange: (type) => ({
    type: ActionType.SORT_CHANGE,
    payload: type,
  }),
  loadDataOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  }),
  requireAuhtorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  logout: () => ({
    type: ActionType.LOGOUT,
  }),
};

export const isCheckedAuth = (authorizationStatus) =>
  authorizationStatus === AuthorizationStatus.UNKNOWN;
