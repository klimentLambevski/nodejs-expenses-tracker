import {actions} from "./self.actions";

const selfReducer = (state = {}, action) => {

    switch (action.type) {
        case actions.GET_SELF:
            return action.self;

        default:
            return state;
    }

};

export default selfReducer;