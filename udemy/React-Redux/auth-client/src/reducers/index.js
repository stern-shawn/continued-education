import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth from './auth';
import comments from './comments';

const rootReducer = combineReducers({
  form,
  auth,
  comments,
});

export default rootReducer;
