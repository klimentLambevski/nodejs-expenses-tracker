const webdriver = require('selenium-webdriver');

const driver = new webdriver.Builder()
    .forBrowser('phantomjs')
    .build();

const until = webdriver.until;
const By = webdriver.By;

describe('login form', () => {
    // e2e tests are too slow for default Mocha timeout
    this.timeout(10000);

    before(function(done) {
        driver.navigate().to('http://localhost:4000/#/login')
            .then(() => done())
    });

    it('autocompletes the name field', function(done) {
        driver.findElement(By.css('.email')).sendKeys('admin@test.com');
        driver.findElement(By.css('.password')).sendKeys('test');
        driver.findElement(By.css('.submit')).click()
            .then(() => done());
    });

    after(function(done) {
        driver.quit()
            .then(() => done())
    });
});