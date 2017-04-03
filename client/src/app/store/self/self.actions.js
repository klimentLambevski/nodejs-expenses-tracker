import {createActionMap} from '../action';
import {getSelf, updateSelf} from "../../services/api/self";
import {push} from 'react-router-redux';
import {showAlert} from "../alert/alert.actions";


export const actions = createActionMap({
    GET_SELF: '',
    LOGOUT_SELF: '',
}, 'self');

const getSelfSuccess = (self) => ({
    type: actions.GET_SELF,
    self
});

const loguotSuccess = () => ({
    type: actions.LOGOUT_SELF
});

export const getSelfAction = () =>
    (dispatch) => getSelf()
        .then(
            response => dispatch(getSelfSuccess(response))
        )
        .catch(
            error => dispatch(push('/login'))
        );


export const saveSelfAction = (data) =>
    (dispatch) => updateSelf(data)
        .then(
            response => dispatch(getSelfSuccess(response))
        )
        .catch(
            error => {
                error.data.map((err) => {
                    dispatch(showAlert(err))
                });
            }
        );

export const logoutSelf = () =>
    (dispatch) => dispatch(loguotSuccess());
