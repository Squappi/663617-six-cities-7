import {ActionType} from '../../store/action';
import browserHistory from '../browser-history/browser-history';

export const redirect = (_store) => (next) => (action) => {
  if (action.type === ActionType.REDIRECT_TO_ROUTE) {
    browserHistory.push(action.payload);
  }
  return next(action);
};

