import {createActionMap} from '../action';
import {getSelf} from "../../services/api/self";
import {push} from 'react-router-redux';


export const actions = createActionMap({
    GET_SELF: '',
}, 'self');

const getSelfSuccess = (self) => ({
    type: actions.GET_SELF,
    self
});


export const getSelfAction = () =>
    (dispatch) => getSelf()
        .then(
            response => dispatch(getSelfSuccess(response))
        )
        .catch(
            error => dispatch(push('/login'))
        );
