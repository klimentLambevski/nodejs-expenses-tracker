import {createActionMap} from '../action';
import {push} from 'react-router-redux';
import {createUser, deleteUser, getUsers, updateUser} from "../../services/api/users";
import {showAlert} from "../alert/alert.actions";


export const actions = createActionMap({
    GET_USERS: '',
    ADD_USER: '',
    UPDATE_USER: '',
    DELETE_USER: ''
}, 'self');

const getUsersSuccess = (users) => ({
    type: actions.GET_USERS,
    users
});

const createUserSuccess = (user) => ({
    type: actions.ADD_USER,
    user
});

const updateUserSuccess = (user) => ({
    type: actions.UPDATE_USER,
    user
});

const deleteUserSuccess = (user) => ({
    type: actions.DELETE_USER,
    user
});

export const getUsersAction = (roles) =>
    (dispatch) => getUsers(roles)
        .then(
            response => dispatch(getUsersSuccess(response))
        )
        .catch(
            error => dispatch(push('/login'))
        );

export const createUserAction = (data, dispatch) =>
    createUser(data)
        .then(
            response => dispatch(createUserSuccess(response))
        )
        .catch(
            error => {
                error.data.map((err) => {
                    dispatch(showAlert(err))
                });
            }
        );

export const updateUserAction = (data, dispatch) =>
    updateUser(data)
        .then(
            response => dispatch(updateUserSuccess(response))
        )
        .catch(
            error => {
                error.data.map((err) => {
                    dispatch(showAlert(err))
                });
            }
        );

export const saveUserAction = (data) =>
    (dispatch) => {
        return data.id ? updateUserAction(data, dispatch): createUserAction(data, dispatch)
    };

export const deleteUserAction = (data) =>
    (dispatch) => deleteUser(data)
        .then(
            response => dispatch(deleteUserSuccess(response))
        )
        .catch(
            error => {
                error.data.map((err) => {
                    dispatch(showAlert(err))
                });
            }
        );