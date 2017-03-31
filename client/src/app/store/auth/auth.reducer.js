import {actions} from "./auth.actions";

const authReducer = (state = {}, action) => {

  switch (action.type) {
    case actions.AUTH_SUCCESS:
      return {
        isAuthenticated: true,
        user: action.token
      };

    case actions.AUTH_ERROR:
      return {
        isAuthenticated: false,
        error: action.error
      };

    case actions.NOT_AUTHENTICATED:
      return {
        isAuthenticated: false
      };

    case actions.LOGOUT_SUCCESS:
      return {
        isAuthenticated: false
      };

    default:
      return state;
  }

};

export default authReducer;
