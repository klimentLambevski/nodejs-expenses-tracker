import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {reducer as form} from 'redux-form';
import auth from './auth/auth.reducer';
import alertMessages from './alert/alert.reducer';


const rootReducer = combineReducers({
  // todo: find a suitable name for common
  common: combineReducers({
    auth,
  }),
  alertMessages,
  routing,
  form,
});

export default rootReducer;
