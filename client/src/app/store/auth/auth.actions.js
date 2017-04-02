import {push, go} from "react-router-redux";
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
const authSuccess = (token) => ({
    type: actions.AUTH_SUCCESS,
    token
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
            dispatch(authSuccess(data.token));
            dispatch(push('/dashboard'));
        })
        .catch(error => {
            dispatch(showAlert(error));
        });

export const isAuthenticated = () =>
    (dispatch) => {
        const token = LocalStorageService.getItem('AUTH_TOKEN');
        console.log(token);
        if (!token) {
            dispatch(notAuthenticated());
            dispatch(push('/login'));
            return false;
        } else {
            axios.defaults.headers.common['Authorization'] = `JWT ${token}`;
            dispatch(authSuccess(token));
            dispatch(push('/dashboard'));
            return true;
        }
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
