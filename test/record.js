const assert = require('assert');
const {Record} = require('../app/models');
const {sequelize} = require('../app/database/instances');
beforeEach(() => {
    // return sequelize.sync({force: true});
});

describe('Record', () => {
    describe('Create record', () => {
        it('should create record', (done) => {
            let workedTo = new Date();
            workedTo.setHours(workedTo.getHours() + 1);
            Record.create({
                workedFrom: new Date(),
                workedTo: workedTo
            }).then(record => {
                assert(record);
                record.destroy().then(() => {
                    done();
                });
            })
        });

    });
});