import {createActionMap} from '../action';
import {
    addSelfRecords, addUserRecords, deleteSelfRecord, getSelf, getSelfRecords,
    updateSelfRecord
} from "../../services/api/self";
import {showAlert} from "../alert/alert.actions";
import {deleteRecord, getUserRecords} from "../../services/api/users";
import * as _ from "lodash";

export const actions = createActionMap({
    GET_RECORDS: '',
    ADD_RECORD: '',
    UPDATE_RECORD: '',
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

export const getSelfRecordsAction = (date, dateTo, search) =>
    (dispatch) => getSelfRecords(date, dateTo, search)
        .then(response =>
            dispatch(getSelfRecordsSuccess(response.map(({date, ...rest}) => ({date: new Date(date), time: new Date(date), ...rest}))))
        )
        .catch(
            error => {
                console.log(error);
                dispatch(showAlert('Error trying to get records', true));
                return Promise.reject(error);
            }
        );

export const getUserRecordsAction = (user, date, dateTo, search) =>
    (dispatch) => getUserRecords(user, date, dateTo, search)
        .then(
            response => {
                dispatch(getSelfRecordsSuccess(response.map(({date, ...rest}) => ({date: new Date(date), time: new Date(date), ...rest}))));
            }
        )
        .catch(
            error => {
                dispatch(showAlert({message: 'Error trying to get records'}, true));
                return Promise.reject(error);
            }
        );

export const addSelfRecordAction = (record) =>
    (dispatch) => addSelfRecords(record)
        .then(
            ({date, ...rest}) => {
                // dispatch(addSelfRecordSuccess({
                //     date: new Date(date),
                //     time: new Date(date),
                //     ...rest
                // }));
                dispatch(showAlert({message: 'New record added'}));
            }

        )
        .catch(
            error => {
                error.data.map(err => dispatch(showAlert({message: err.message}, true)));
                return Promise.reject(error);
            }
        );


export const addUserRecordAction = (user, record) =>
    (dispatch) => addUserRecords(user, record)
        .then(
            ({date, ...rest}) => {
                // dispatch(addSelfRecordSuccess({
                //     date: new Date(date),
                //     time: new Date(date),
                //     ...rest
                // }));
                dispatch(showAlert({message: 'New record added'}));
            }

        )
        .catch(
            error => {
                error.data.map(err => dispatch(showAlert({message: err.message}, true)));
                return Promise.reject(error);
            }
        );

export const updateSelfRecordAction = (record) =>
    (dispatch) => updateSelfRecord(record)
        .then(({date, ...rest}) => {
            dispatch({
                type: actions.UPDATE_RECORD,
                record: {
                    date: new Date(date),
                    time: new Date(date),
                    ...rest
                }
            })
        }).catch(err => {
            console.log('update record err -->', err);
            return Promise.reject(error);
        });

export const deleteRecordAction = (user, record) =>
    (dispatch) => deleteRecord(user, record)
        .then(
            response => {
                dispatch(deleteRecordSuccess(response));
                dispatch(showAlert({message: 'Record successfully deleted'}));
            }

        )
        .catch(
            error => {
                dispatch(showAlert('Error trying to get records', true));
                return Promise.reject(error);
            }
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
            error => dispatch(showAlert('Error trying to get records', true))
        );


