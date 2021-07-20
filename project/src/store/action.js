import { AuthorizationStatus } from '../const';

export const ActionType = {
  LIST_OF_OFFERS: 'offers/listOfOffers',
  LOAD_OFFER: 'offer/loadOffer',
  CITY_CHANGE: 'offers/cityChange',
  SORT_CHANGE: 'sort/sortChange',
  REQUIRED_AUTHORIZATION: 'user/requiredAuthorization',
  LOGOUT: 'user/logout',
  REDIRECT_TO_ROUTE: 'redirect/redirectToRoute',
  LIST_OF_COMMENTS: 'comments/listOfComments',
  FAVORITES_UPDATE: 'card/favoritesValue',
  FAVORITE_LOADED: 'card/favoriteLoaded',
};


export const ActionCreator = {
  loadOffers: (offers) => ({
    type: ActionType.LIST_OF_OFFERS,
    payload: offers,
  }),
  loadOffer: (offer) => ({
    type: ActionType.LOAD_OFFER,
    payload: offer,
  }),
  loadComments: (reviews) => ({
    type: ActionType.LIST_OF_COMMENTS,
    payload: reviews,
  }),
  favoriteLoaded: (offers) => ({
    type: ActionType.FAVORITE_LOADED,
    payload: offers,
  }),
  favoriteUpdate: (value) => ({
    type: ActionType.FAVORITES_UPDATE,
    payload: value,
  }),
  changeCity: (city) => ({
    type: ActionType.CITY_CHANGE,
    payload: city,
  }),
  sortChange: (type) => ({
    type: ActionType.SORT_CHANGE,
    payload: type,
  }),
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  logout: () => ({
    type: ActionType.LOGOUT,
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  }),
};

export const isCheckedAuth = (authorizationStatus) =>
  authorizationStatus !== AuthorizationStatus.UNKNOWN;
