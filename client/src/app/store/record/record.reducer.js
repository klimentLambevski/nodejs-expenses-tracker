import {actions} from "./record.actions";

const recordsReducer = (state = {}, action) => {

    switch (action.type) {
        case actions.GET_RECORDS:
            return action.records;
        case actions.ADD_RECORD:
            return [...state, action.record];

        default:
            return state;
    }

};

export default recordsReducer;