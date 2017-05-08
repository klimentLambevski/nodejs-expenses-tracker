import {actions} from "./record.actions";

const recordsReducer = (state = [], action) => {

    switch (action.type) {
        case actions.GET_RECORDS:
            return action.records;
        case actions.ADD_RECORD:
            return [...state, action.record];
        case actions.UPDATE_RECORD:
            return state.map(record =>
                record.id === action.record.id ?
                    action.record
                    :
                    Object.assign({}, record)
            );
        case actions.DELETE_RECORD:
            return state.reduce((acc, record) => {
                if(record.id !== action.record.id) {
                    acc.push(record);
                }
                return acc;
            }, []);
        default:
            return state;
    }

};

export default recordsReducer;