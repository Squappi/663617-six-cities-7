export const ActionType = {
  LIST_OF_OFFERS: 'offers/listOfOffers',
  CITY_CHANGE: 'offers/cityChange',
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
};
