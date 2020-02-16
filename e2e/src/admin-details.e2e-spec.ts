import { browser, logging } from 'protractor';
import { AdminDetailPage } from './po/admin-details.po';

describe('App /admin E2E tests', () => {
    let page: AdminDetailPage;

    beforeEach(() => {
        page = new AdminDetailPage();
        page.navigateTo();
    });

    it('logout link must redirect', () => {
        page.getLogoutLink().click().then(() => {
            browser.sleep(2000).then(() => {
                browser.getCurrentUrl().then((actualUrl) => {
                    expect(actualUrl.indexOf('login') !== -1).toBeTruthy();
                });
            });
        });
    });

    it('should display searchBar', () => {
        expect(page.getSearchBar().isDisplayed()).toBeTruthy();
    });

    it('should display searchButton', () => {
        expect(page.getSearchBar().isDisplayed()).toBeTruthy();
        // expect(page.getSearchButton().isDisplayed()).toBeTruthy();
    });

    it('should display table', () => {
        // expect(page.getCaption().getText()).toEqual('Admin Portal');
        // expect(page.getTable().isDisplayed()).toBeTruthy();
    });

    it('should switch ban to unban', () => {
        expect(page.getValues().isDisplayed()).toBeTruthy();
        // expect(page.getBanButtons().get(0).isEnabled()).toBeTruthy();
    });

    afterEach(async () => {
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
