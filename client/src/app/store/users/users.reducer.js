import {actions} from "./users.actions";

const usersReducer = (state = [], action) => {

    switch (action.type) {
        case actions.GET_USERS:
            return action.users;
        case actions.ADD_USER:
            return [
                action.user,
                ...state
            ];
        case actions.UPDATE_USER:
            return state.map(user =>
                user.id === action.user.id ?
                    action.user
                    :
                    Object.assign({}, user)
            );
        case actions.DELETE_USER:
            return state.reduce((acc, user) => {
                if(user.id !== action.user.id) {
                    acc.push(user);
                }
                return acc;
            }, []);
        default:
            return state;
    }

};

export default usersReducer;