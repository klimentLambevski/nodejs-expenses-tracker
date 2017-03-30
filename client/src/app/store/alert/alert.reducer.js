import { actions } from "./alert.actions";

const alertReducer = (state = [], action) => {

  switch (action.type) {
    case actions.SHOW_ALERT:
      return [
        ...state,
        action.alert
      ];

    case actions.REMOVE_ALERT:
      return state.filter(alert => alert.alertId !== action.alertId);

    default:
      return state;
  }

};

export default alertReducer;
