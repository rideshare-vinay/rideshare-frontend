import { browser, logging } from 'protractor';
import { SignUpPage } from './signup.po';

fdescribe('App /register E2E tests', () => {
    let page: SignUpPage;

    beforeEach(() => {
        page = new SignUpPage();
        page.navigateTo();
    });

    it('should display register form', () => {
        browser.ignoreSynchronization = true;
        expect(page.getRegisterForm().isDisplayed()).toBeTruthy();
    });

    it('signup button should be disabled', () => {
        page.getUserName().sendKeys('');
        page.getFirstName().sendKeys('');
        page.getLastName().sendKeys('');
        page.getPhone().sendKeys('');
        page.getEmail().sendKeys('');
        page.getAddress().sendKeys('');
        page.getLocation().sendKeys('');
        page.getBatchNumber().sendKeys('');
        expect(page.getSubmitButton().isEnabled()).toBeFalsy();
    });

    it('signup button should be enabled', () => {
        // TODO: check mock values after validation
        page.getUserName().sendKeys('abc');
        page.getFirstName().sendKeys('abc');
        page.getLastName().sendKeys('abc');
        page.getPhone().sendKeys('abc');
        page.getEmail().sendKeys('abc');
        page.getAddress().sendKeys('abc');
        page.getLocation().sendKeys('abc');
        page.getBatchNumber().sendKeys('abc');
        expect(page.getSubmitButton().isEnabled()).toBeTruthy();
    });

    it('submit with valid inputs', () => {
        // TODO: check mock values after validation
        page.getUserName().sendKeys('abc');
        page.getFirstName().sendKeys('abc');
        page.getLastName().sendKeys('abc');
        page.getPhone().sendKeys(1234567890);
        page.getEmail().sendKeys('abc@gmail.com');
        // page.getAddress().sendKeys('abc');
        // page.getLocation().sendKeys('abc');
        // page.getBatchNumber().sendKeys('abc');
        expect(page.getUserName().getAttribute('value')).toEqual('abc');
        // browser.ignoreSynchronization = true;
        // page.getSubmitButton().click().then(() => {
        //   browser.getCurrentUrl().then((actualUrl) => {
        //     expect(actualUrl.indexOf('home/drivers') !== -1).toBeTruthy();
        //   });
        // });
    });

    // TODO: invalid-mock-value for each field after UI got identifier

    afterEach(async () => {
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
