import {createActionMap} from '../action';
import {addSelfRecords, deleteSelfRecord, getSelf, getSelfRecords} from "../../services/api/self";
import {showAlert} from "../alert/alert.actions";
import {deleteRecord, getUserRecords} from "../../services/api/users";

export const actions = createActionMap({
    GET_RECORDS: '',
    ADD_RECORD: '',
    DELETE_RECORD: ''
}, 'self');

const getSelfRecordsSuccess = (records) => ({
    type: actions.GET_RECORDS,
    records
});

const addSelfRecordSuccess = (record) => ({
    type: actions.ADD_RECORD,
    record
});

const deleteRecordSuccess = (record) => ({
    type: actions.DELETE_RECORD,
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

export const getUserRecordsAction = (user, date, dateTo) =>
    (dispatch) => getUserRecords(user, date, dateTo)
        .then(
            response => {
                dispatch(getSelfRecordsSuccess(response));
            }
        )
        .catch(
            error => dispatch(showAlert({message: 'Error trying to get records'}))
        );

export const addSelfRecordAction = (fromDate, toDate, notes) =>
    (dispatch) => addSelfRecords({fromDate, toDate, notes})
        .then(
            response => {
                dispatch(addSelfRecordSuccess(response));
                dispatch(showAlert({message: 'New record added'}));
            }

        )
        .catch(
            error => {
                error.data.map(err => dispatch(showAlert({message: err.message})))
            }
        );

export const deleteRecordAction = (user, record) =>
    (dispatch) => deleteRecord(user, record)
        .then(
            response => {
                dispatch(deleteRecordSuccess(response));
                dispatch(showAlert({message: 'Record successfully deleted'}));
            }

        )
        .catch(
            error => dispatch(showAlert('Error trying to get records'))
        );

export const deleteSelfRecordAction = (record) =>
    (dispatch) => deleteSelfRecord(record)
        .then(
            response => {
                dispatch(deleteRecordSuccess(response));
                dispatch(showAlert({message: 'Record successfully deleted'}));
            }

        )
        .catch(
            error => dispatch(showAlert('Error trying to get records'))
        );


