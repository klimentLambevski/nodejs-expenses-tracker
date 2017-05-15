import selfReducer from '../src/app/store/self/self.reducer';
import {actions} from "../src/app/store/self/self.actions";
import * as _ from "lodash";

const assert = require("assert");

describe('Self', () => {
    describe('Self reducer', () => {
        it('should init self', () => {
            let store = selfReducer({}, {
                type: actions.GET_SELF,
                self: {
                    id: 1,
                    name: 'test',
                    lastName: 'test',
                    email: 'test@test.com'
                }
            });

            assert.equal(store.name, 'test');
            assert.equal(store.lastName, 'test');
            assert.equal(store.email, 'test@test.com');
        });

        it('should logout self', () => {
            let store = selfReducer({
                id: 1,
                name: 'test',
                lastName: 'test',
                email: 'test@test.com'
            }, {
                type: actions.LOGOUT_SELF
            });

            assert(_.isEmpty(store));

        });


    })
});