const assert = require('assert');
const {Record} = require('../app/models');
const {sequelize} = require('../app/database/instances');
beforeEach(() => {
    // return sequelize.sync({force: true});
});

describe('Record', () => {
    describe('Create record', () => {
        it('should create record', (done) => {

            Record.create({
                date: new Date(),
                name: 'test record',
                description: 'test description',
                amount: 1,
                comment: 'no comment'
            }).then(record => {
                assert(record);
                record.destroy().then(() => {
                    done();
                });
            })
        });

    });
});