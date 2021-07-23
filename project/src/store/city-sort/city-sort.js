import {SortType} from '../../const';
import {sortList} from '../../sorting';
import {ActionType} from '../action';
import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  city: 'Paris',
  sortType: SortType.POPULAR,
  cityOffers: [],
  listOffers: [],
  favorites: [],
  isDataLoaded: false,
};

const citySort = createReducer(initialState, (builder) => {
  builder
    .addCase(ActionType.CITY_CHANGE, (state, action) => {
      state.city = action.payload;
      state.sortType = SortType.POPULAR;
      state.cityOffers = sortList(state.listOffers.filter((offer) => offer.city.name === action.payload), SortType.POPULAR);
    })
    .addCase(ActionType.LIST_OF_OFFERS, (state, action) => {
      state.listOffers = action.payload;
      state.cityOffers = sortList(action.payload.filter((offer) => offer.city.name === state.city), state.sortType);
      state.isDataLoaded = true;
    })
    .addCase(ActionType.SORT_CHANGE, (state, action) => {
      state.sortType = action.payload;
      state.cityOffers = sortList(state.listOffers.filter((offer) => offer.city.name === state.city), action.payload);
    })
    .addCase(ActionType.FAVORITE_LOADED, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(ActionType.FAVORITES_UPDATE, (state, action) => {
      const updatedCard = action.payload;
      const newOfferList = [...state.listOffers];
      let cardIndex;
      cardIndex = newOfferList.findIndex((item) => item.id === updatedCard.id);
      if (cardIndex >= 0) {
        newOfferList[cardIndex] = updatedCard;
      }
      const newCityOffers = [...state.cityOffers];
      cardIndex = newCityOffers.findIndex((item) => item.id === updatedCard.id);
      if (cardIndex >= 0) {
        newCityOffers[cardIndex] = updatedCard;
      }
      const newFavorites = [...state.favorites];
      cardIndex = newFavorites.findIndex((item) => item.id === updatedCard.id);
      if (cardIndex >= 0) {
        newFavorites.splice(cardIndex, 1);
      }
      state.listOffers = newOfferList;
      state.cityOffers = newCityOffers;
      state.favorites = newFavorites;
    });
});

export {citySort};
