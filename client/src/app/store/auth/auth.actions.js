import {push} from "react-router-redux";
// import { signIn, checkAuthenticated, logout } from "../../services/api/auth";
import LocalStorageService from "../../services/storage/local.storage.service";
import {createActionMap} from "../action";
import {showAlert} from '../alert/alert.actions';
import {signIn} from "../../services/api/auth";
import * as axios from 'axios';

export const actions = createActionMap({
    AUTH_SUCCESS: '',
    AUTH_ERROR: '',
    NOT_AUTHENTICATED: '',
    LOGOUT_SUCCESS: '',
}, 'auth');

//action creators
const authSuccess = (loggedInUser) => ({
    type: actions.AUTH_SUCCESS,
    loggedInUser
});

const notAuthenticated = () => ({
    type: actions.NOT_AUTHENTICATED
});

const logoutSuccess = () => ({
    type: actions.LOGOUT_SUCCESS
});

//thunks
export const authenticateUser = (user, redirectUrl) =>
    (dispatch) => signIn(user)
        .then((data) => {
            LocalStorageService.setItem('AUTH_TOKEN', data.token);
            axios.defaults.headers.common['Authorization'] = `JWT ${data.token}`;
            dispatch(authSuccess(data.user));
            dispatch(push(redirectUrl));
        })
        .catch(error => {
            dispatch(showAlert(error));
        });

export const isAuthenticated = () =>
    (dispatch) => {
        const token = LocalStorageService.getItem('AUTH_TOKEN');
        if (!token) {
            dispatch(notAuthenticated());
        }

        return checkAuthenticated()
            .then((data) => {
                LocalStorageService.setItem('AUTH_TOKEN', data.token);
                dispatch(authSuccess(data.user));
            })
            .catch(() => {
                dispatch(notAuthenticated());
            });
    };

export const logoutUser = () =>
    (dispatch) => logout()
        .then(() => {
            LocalStorageService.removeItem('AUTH_TOKEN');
            dispatch(logoutSuccess());
            dispatch(push('/'));
        })
        .catch(error => {
            throw error;
        });
