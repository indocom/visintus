import planReducer from './planReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  plan: planReducer
});

export default rootReducer;
