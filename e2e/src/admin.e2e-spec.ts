import { browser, logging } from 'protractor';
import { AdminPage } from './admin.po';

describe('App /login/admin E2E tests', () => {
    let page: AdminPage;

    beforeEach(() => {
        page = new AdminPage();
        page.navigateTo();
    });

    it('should display image', () => {
        expect(page.getImage().isDisplayed()).toBeTruthy();
    });

    it('should display loginCard', () => {
        expect(page.getLoginCard().isDisplayed()).toBeTruthy();
    });

    it('signin-as-user link must redirect', () => {
        page.getSignInLink().click().then(() => {
            browser.sleep(2000).then(() => {
                browser.getCurrentUrl().then((actualUrl) => {
                    expect(actualUrl.indexOf('login') !== -1).toBeTruthy();
                });
            });
        });
    });

    it('login button should be disabled', () => {
        page.getAccountOptions().sendKeys('');
        page.getUsername().sendKeys('');
        expect(page.getLoginButton().isEnabled()).toBeFalsy();
    });

    it('login button should be enabled', () => {
        // TODO: check mock values after validation
        page.getAccountOptions().sendKeys('abc');
        page.getUsername().sendKeys('abc');
        expect(page.getLoginButton().isEnabled()).toBeTruthy();
    });

    it('login with valid inputs', () => {
        page.getUsername().sendKeys('admin');
        expect(page.getAccountOptions().get(0).getAttribute('value')).toEqual(null);
        expect(page.getUsername().getAttribute('value')).toEqual('admin');
        // browser.ignoreSynchronization = true;
        // page.getLoginButton().click().then(() => {
        //   browser.getCurrentUrl().then((actualUrl) => {
        //     expect(actualUrl.indexOf('home/drivers') !== -1).toBeTruthy();
        //   });
        // });
    });

    it('login with invalid inputs', () => {
        page.getUsername().sendKeys('abc');
        browser.ignoreSynchronization = true;
        page.getLoginButton().click().then(() => {
            browser.getCurrentUrl().then((actualUrl) => {
                expect(page.getLoginFailedMessage().isDisplayed()).toBeTruthy();
            });
        });
    });

    it('login with banned admin inputs', () => {
        // TODO: mock 1 banned admin acct
        page.getUsername().sendKeys('abc');
        browser.ignoreSynchronization = true;
        page.getLoginButton().click().then(() => {
            browser.getCurrentUrl().then((actualUrl) => {
                // TODO: get different element when UI done
                expect(page.getLoginFailedMessage().isDisplayed()).toBeTruthy();
            });
        });
    });

    afterEach(async () => {
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
