import {AppRoute, AuthorizationStatus} from '../const';
import {ActionCreator} from '../store/action';

const ApiRoute = {
  OFFER_API: 'hotels',
  LOGIN: '/login',
  LOGOUT: '/logout',
  COMMENTS: '/comments',
  FAVORITES: '/favorite',
};

const adaptToClient = (offer) => {
  const adaptedOffer = {
    ...offer,
    host: {
      ...offer.host,
      avatarUrl: offer.host.avatar_url,
      isPro: offer.host.is_pro,
    },
    isFavorite: offer.is_favorite,
    isPremium: offer.is_premium,
    maxAdults: offer.max_adults,
    previewImage: offer.preview_image,
  };

  delete adaptedOffer.host.avatar_url;
  delete adaptedOffer.host.is_pro;
  delete adaptedOffer.is_favorite;
  delete adaptedOffer.is_premium;
  delete adaptedOffer.max_adults;
  delete adaptedOffer.preview_image;

  return adaptedOffer;
};

const adaptToReviewsClient = (review) => {
  const adaptedRewiew = {
    ...review,
    user: {
      ...review.user,
      isPro: review.user.is_pro,
      avatarUrl: review.user.avatar_url,
    },
  };

  delete adaptedRewiew.user.is_pro;
  delete adaptedRewiew.user.avatar_url;

  return adaptedRewiew;
};


export const axiosLoadOffers = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.OFFER_API)
    .then(({data}) => data.map(adaptToClient))
    .then((offers) => dispatch(ActionCreator.loadOffers(offers)))
    .catch(() => {})
);

export const axiosLoadOffersId = (id) => (dispatch, _getState, api) => (
  api.get(`${ApiRoute.OFFER_API}/${id}`)
    .then((data) => data.dispatch(ActionCreator.loadOffer(adaptToClient(data))))
    .catch(() => {})
);

export const axiosLoadComments = (id) => (dispatch, _getState, api) => {
  dispatch(ActionCreator.loadComments(null));
  return api.get(`${ApiRoute.COMMENTS}/${id}`)
    .then(({data}) => data.map(adaptToReviewsClient))
    .then((reviews) => dispatch(ActionCreator.loadComments(reviews)))
    .catch(() => {});
};

export const axiosSendComments = (id, rating, comment) => (dispatch, _getState, api) => (
  api.post(`${ApiRoute.COMMENTS}/${id}`, {rating, comment})
    .then(({data}) => data.map(adaptToReviewsClient))
    .then((reviews) => dispatch(ActionCreator.loadComments(reviews)))
    .catch(() => {})
);

export const axiosLoadedFavorites = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.FAVORITES)
    .then(({data}) => data.map(adaptToClient))
    .then((offers) => dispatch(ActionCreator.favoriteLoaded(offers)))
    .catch(() => {})
);

export const axiosSendFavorites = (id, value) => (dispatch, _getState, api) => (
  api.post(`${ApiRoute.FAVORITES}/${id}/${value}`)
    .then(({data}) => adaptToClient(data))
    .then((offer) => dispatch(ActionCreator.favoriteUpdate(offer)))
    .catch(() => {})
);

export const axiosLoadedNeaby = (id) => (dispatch, _getState, api) => (
  api.get(`${ApiRoute.OFFER_API}/${id}/nearby`)
    .then(({data}) => data.map(adaptToClient))
    .then((offers) => dispatch(ActionCreator.loadNearby(offers)))
    .catch(() => {})
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(ApiRoute.LOGIN)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)))
    .catch(() => {})
);

export const loginAuth = ({login, password}) => (dispatch, _getState, api) => (
  api.post(ApiRoute.LOGIN, {email: login, password})
    .then(({data}) => {
      localStorage.setItem('token', data.token);
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(ActionCreator.redirectToRoute(AppRoute.ROOT));
    })
);


export const logout = () => (dispatch, _getState, api) => (
  api.delete(ApiRoute.LOGOUT)
    .then(() => {
      localStorage.removeItem('token');
      dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
    })
);
