import { createActionMap } from '../action';

export const actions = createActionMap({
  SHOW_ALERT: '',
  REMOVE_ALERT: ''
}, 'alert');

export const showAlert = (alert) => ({
  type: actions.SHOW_ALERT,
  alert: {
    ...alert,
    alertId: _.uniqueId("alert-")
  }
});

export const removeAlert = (alertId) => ({
  type: actions.REMOVE_ALERT,
  alertId
});
