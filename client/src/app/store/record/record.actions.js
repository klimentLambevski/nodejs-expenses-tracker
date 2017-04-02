import {createActionMap} from '../action';
import {addSelfRecords, getSelf, getSelfRecords} from "../../services/api/self";
import {showAlert} from "../alert/alert.actions";

export const actions = createActionMap({
    GET_RECORDS: '',
    ADD_RECORD: ''
}, 'self');

const getSelfRecordsSuccess = (records) => ({
    type: actions.GET_RECORDS,
    records
});

const addSelfRecordSuccess = (record) => ({
    type: actions.ADD_RECORD,
    record
});

export const getSelfRecordsAction = (date) =>
    (dispatch) => getSelfRecords(date)
        .then(
            response => {
                dispatch(getSelfRecordsSuccess(response));
            }
        )
        .catch(
            error => dispatch(showAlert('Error trying to get records'))
        );

export const addSelfRecordAction = (fromDate, toDate) =>
    (dispatch) => addSelfRecords({fromDate, toDate})
        .then(
            response => {
                dispatch(addSelfRecordSuccess(response));
                dispatch(showAlert({message: 'New record added'}));
            }

        )
        .catch(
            error => dispatch(showAlert('Error trying to get records'))
        );