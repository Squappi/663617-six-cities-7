import {NameSpace} from '../root-reducer/root-reducer';

export const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus;
export const getOffers = (state) => state[NameSpace.SORT].listOffers;
export const getDataLoaded = (state) => state[NameSpace.SORT].isDataLoaded;
export const getCurrentCity = (state) => state[NameSpace.SORT].city;
export const getCityOffers = (state) => state[NameSpace.SORT].cityOffers;
export const getSortType = (state) => state[NameSpace.SORT].sortType;
export const getListComments = (state) => state[NameSpace.LOAD].listComments;
export const getFavorites = (state) => state[NameSpace.SORT].favorites;
export const getNearby = (state) => state[NameSpace.LOAD].nearby;

