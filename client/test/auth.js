import authReducer from '../src/app/store/auth/auth.reducer';
import {actions} from "../src/app/store/auth/auth.actions";
const assert = require("assert");

describe('Auth', () => {
    describe('Auth reducer', () => {
        it('should auth successfully', () => {
            let store = authReducer({}, {
                type: actions.AUTH_SUCCESS,
                token: 'test-token'
            });

            assert.equal(store.isAuthenticated, true);
            assert.equal(store.user, 'test-token');
        });

        it('should auth error', () => {
            let store = authReducer({}, {
                type: actions.AUTH_ERROR,
                error: 'wrong-token'
            });

            assert.equal(store.isAuthenticated, false);
            assert.equal(store.error, 'wrong-token');
        });

        it('should not auth', () => {
            let store = authReducer({}, {
                type: actions.NOT_AUTHENTICATED
            });

            assert.equal(store.isAuthenticated, false);
        });

        it('should logout successfully', () => {
            let store = authReducer({}, {
                type: actions.LOGOUT_SUCCESS
            });

            assert.equal(store.isAuthenticated, false);
        });
    })
});