import {SortType} from './const';

export const  sortList = (offer, type) => {
  switch (type) {
    case SortType.PRICE_HIGH_TO_LOW:
      return offer.sort((a, b) => b.price - a.price);
    case SortType.PRICE_LOW_TO_HIGH:
      return offer.sort((a,b) => a.price - b.price);
    case SortType.TOP_RATED_FIRST:
      return offer.sort((a,b) => b.rating - a.rating);
    default:
      return offer;
  }
};

