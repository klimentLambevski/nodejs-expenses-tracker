import {createActionMap} from '../action';
import {push} from 'react-router-redux';
import {
    completeInvitation, createUser, deleteUser, getUsers, inviteMember, unblockUser,
    updateUser
} from "../../services/api/users";
import {showAlert} from "../alert/alert.actions";
import * as axios from "axios";
import LocalStorageService from "../../services/storage/local.storage.service";


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

export const unblockUserAction = (user) =>
    (dispatch) => unblockUser(user)
        .then(
            response => dispatch(updateUserSuccess(response))
        )
        .catch(err => console.log('unblock user err -->', err));

export const inviteMemberAction = (email) =>
    (dispatch) => inviteMember(email)
        .then(res => {
            dispatch(showAlert(res[0]));
            return res;
        })
        .catch(err => console.log('invite member err -->', err));

export const completeInvitationAction = (user) =>
    (dispatch) => completeInvitation(user)
        .then(res => {
            LocalStorageService.setItem('AUTH_TOKEN', res.token);
            axios.defaults.headers.common['Authorization'] = `JWT ${res.token}`;
            return res;
        }).catch(err => {
            dispatch(showAlert(err.data));
            return Promise.reject(err.data);
        });