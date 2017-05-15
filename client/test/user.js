import usersReducer from '../src/app/store/users/users.reducer';
import {actions} from "../src/app/store/users/users.actions";
const assert = require("assert");

describe('User', () => {
    describe('User reducer', () => {
        it('should add new user', () => {
            let store = usersReducer([], {
                type: actions.ADD_USER,
                user: {
                    id: 1,
                    name: 'test',
                    lastName: 'test',
                    email: 'test@test.com'
                }
            });

            assert.equal(store[0].name, 'test');
            assert.equal(store[0].lastName, 'test');
            assert.equal(store[0].email, 'test@test.com');
        });

        it('should update user', () => {
            let store = usersReducer([{
                id: 1,
                name: 'test',
                lastName: 'test',
                email: 'test@test.com'
            }], {
                type: actions.UPDATE_USER,
                user: {
                    id: 1,
                    name: 'test2',
                    lastName: 'test',
                    email: 'test@test.com'
                }
            });

            assert.equal(store[0].name, 'test2');
            assert.equal(store[0].lastName, 'test');
            assert.equal(store[0].email, 'test@test.com');
        });

        it('should delete user', () => {
            let store = usersReducer([{
                id: 1,
                name: 'test',
                lastName: 'test',
                email: 'test@test.com'
            }], {
                type: actions.DELETE_USER,
                user: {
                    id: 1,
                    name: 'test2',
                    lastName: 'test',
                    email: 'test@test.com'
                }
            });

            assert.equal(store.length, 0);

        });
    })
});