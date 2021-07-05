import { AuthorizationStatus } from '../const';
import { ActionCreator } from '../store/action';

const ApiRoute = {
  OFFER_API: 'offerApi',
  LOGIN: '/login',
  LOGOUT: '/logout',
};

const adaptToClient = (offer) => {
  const adapteOffer = {
    ...offer,
    city: {
      ...offer.city,
      location: {
        lat: offer.city.location.latitude,
        lng: offer.city.location.longitude,
        zoom: offer.city.location.zoom,
      },
    },
    host: {
      ...offer.host,
      avatarUrl: offer.host.avatar_url,
      isPro: offer.host.is_pro,
    },
    isFavorite: offer.is_favorite,
    isPremium: offer.is_premium,
    maxAdults: offer.max_adults,
    previewImage: offer.preview_image,
    location: {
      ...offer.location,
      lat: offer.location.latitude,
      lng: offer.location.longitude,
    },
  };

  delete adapteOffer.city.location.latitude;
  delete adapteOffer.city.location.longitude;
  delete adapteOffer.host.avatar_url;
  delete adapteOffer.host.is_pro;
  delete adapteOffer.is_favorite;
  delete adapteOffer.is_premium;
  delete adapteOffer.max_adults;
  delete adapteOffer.preview_image;
  delete adapteOffer.location.latitude;
  delete adapteOffer.location.longitude;

  return adapteOffer;
};


export const axiosLoadOffers = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.OFFER_API)
    .then(({data}) => data.map(adaptToClient))
    .then((offers) => dispatch(ActionCreator.loadOffers(offers)))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.LOGIN)
    .then(() => dispatch(ActionCreator.requireAuhtorization(AuthorizationStatus.NO_AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.get(ApiRoute.LOGIN, {login, password})
    .then(({data}) => localStorage.setItem('token', data.token))
    .then(() => dispatch(ActionCreator.requireAuhtorization(AuthorizationStatus.AUTH)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.LOGOUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => dispatch(ActionCreator.logout))
);