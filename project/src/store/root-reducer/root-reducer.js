import {combineReducers} from 'redux';
import { cityLoad } from '../city-load/city-load';
import { citySort } from '../city-sort/city-sort';
import { user } from '../user/user';

export const NameSpace = {
  USER: 'USER',
  LOAD: 'LOAD',
  UPDATE: 'UPDATE',
  SORT: 'SORT',
};

export default combineReducers({
  [NameSpace.USER]: user,
  [NameSpace.LOAD]: cityLoad,
  [NameSpace.SORT]: citySort,
});
