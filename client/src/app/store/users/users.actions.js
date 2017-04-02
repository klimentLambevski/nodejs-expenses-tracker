import {createActionMap} from '../action';
import {push} from 'react-router-redux';
import {getUsers} from "../../services/api/users";


export const actions = createActionMap({
    GET_USERS: '',
}, 'self');

const getUsersSuccess = (users) => ({
    type: actions.GET_USERS,
    users
});

export const getUsersAction = () =>
    (dispatch) => getUsers()
        .then(
            response => dispatch(getUsersSuccess(response))
        )
        .catch(
            error => dispatch(push('/login'))
        );
