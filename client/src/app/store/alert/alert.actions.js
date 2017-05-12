import {createActionMap} from '../action';
import * as _ from 'lodash';

export const actions = createActionMap({
    SHOW_ALERT: '',
    REMOVE_ALERT: ''
}, 'alert');

export const showAlert = (alert, error) => ({
    type: actions.SHOW_ALERT,
    alert: {
        ...alert,
        alertId: _.uniqueId("alert-"),
        error
    }
});

export const removeAlert = (alertId) => ({
    type: actions.REMOVE_ALERT,
    alertId
});
