import {actions} from "./users.actions";

const usersReducer = (state = [], action) => {

    switch (action.type) {
        case actions.GET_USERS:
            return action.users;

        default:
            return state;
    }

};

export default usersReducer;