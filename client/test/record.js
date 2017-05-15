import recordReducer from '../src/app/store/record/record.reducer';
import {actions} from "../src/app/store/record/record.actions";

const assert = require("assert");

describe('Record', () => {
    describe('Record reducer', () => {
        it('should add new record', () => {
            let date = Date.now();
            let store = recordReducer([], {
                type: actions.ADD_RECORD,
                record: {
                    id: 1,
                    name: 'test',
                    date,
                    description: 'test',
                    amount: 1
                }
            });

            assert.equal(store[0].name, 'test');
            assert.equal(store[0].date, date);
            assert.equal(store[0].description, 'test');
            assert.equal(store[0].amount, 1);
        });

        it('should update record', () => {
            let date = Date.now();
            let store = recordReducer([{
                id: 1,
                name: 'test',
                date,
                description: 'test',
                amount: 1
            }], {
                type: actions.UPDATE_RECORD,
                record: {
                    id: 1,
                    name: 'test2',
                    date,
                    description: 'test',
                    amount: 1
                }
            });

            assert.equal(store[0].name, 'test2');
            assert.equal(store[0].date, date);
            assert.equal(store[0].description, 'test');
            assert.equal(store[0].amount, 1);
        });

        it('should delete record', () => {
            let date = Date.now();
            let store = recordReducer([{
                id: 1,
                name: 'test',
                date,
                description: 'test',
                amount: 1
            }], {
                type: actions.DELETE_RECORD,
                record: {
                    id: 1,
                    name: 'test',
                    date,
                    description: 'test',
                    amount: 1
                }
            });

            assert.equal(store.length, 0);

        });
    })
});