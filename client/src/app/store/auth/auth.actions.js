import {push, go} from "react-router-redux";
// import { signIn, checkAuthenticated, logout } from "../../services/api/auth";
import LocalStorageService from "../../services/storage/local.storage.service";
import {createActionMap} from "../action";
import {showAlert} from '../alert/alert.actions';
import {register, signIn} from "../../services/api/auth";
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
            error.data.map((err) => {
                dispatch(showAlert(err, true))
            });
        });

export const registerUserAction = (user) =>
    (dispatch) => register(user)
        .then(data => {
            // LocalStorageService.setItem('AUTH_TOKEN', data.token);
            // axios.defaults.headers.common['Authorization'] = `JWT ${data.token}`;
            // dispatch(authSuccess(data.token));
            // dispatch(push('/dashboard'));
        })
        .catch(error => {
            error.data.map((err) => {
                dispatch(showAlert(err, true))
            });

            return Promise.reject(error.data);
        });

export const isAuthenticated = (path) =>
    (dispatch) => {
        const token = LocalStorageService.getItem('AUTH_TOKEN');
        if (!token) {
            dispatch(notAuthenticated());

            if(!path.startsWith('/activation') && !path.startsWith('/register') && !path.startsWith('/invitation')) {
                dispatch(push('/login'));
            }
            return false;
        } else {
            axios.defaults.headers.common['Authorization'] = `JWT ${token}`;
            dispatch(authSuccess(token));
            if(!path.startsWith('/dashboard') && !path.startsWith('/activation') && !path.startsWith('/invitation')) {
                dispatch(push('/dashboard'));
            }

            return true;
        }
    };

export const logoutUser = () =>
    (dispatch) => {
            LocalStorageService.removeItem('AUTH_TOKEN');
            dispatch(logoutSuccess());
            dispatch(push('/login'));
        };
