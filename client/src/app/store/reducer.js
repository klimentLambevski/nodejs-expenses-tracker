import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {reducer as form} from 'redux-form';
import auth from './auth/auth.reducer';
import self from './self/self.reducer';
import records from './record/record.reducer';
import users from './users/users.reducer';
import alertMessages from './alert/alert.reducer';


const rootReducer = combineReducers({
    // todo: find a suitable name for common
    common: combineReducers({
        auth,
        self,
        records,
        users
    }),
    alertMessages,
    routing,
    form,
});

export default rootReducer;
