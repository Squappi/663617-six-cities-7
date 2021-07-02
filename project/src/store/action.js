export const ActionType = {
  LIST_OF_OFFERS: 'offers/listOfOffers',
  CITY_CHANGE: 'offers/cityChange',
  SORT_CHANGE: 'sort/sortChange',
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
};
