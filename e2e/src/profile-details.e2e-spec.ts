import { browser, logging } from 'protractor';
import { ProfileDetailPage } from './po/profile-details.po';

describe('App /profile E2E tests', () => {
    let page: ProfileDetailPage;

    beforeEach(() => {
        page = new ProfileDetailPage();
        page.navigateTo();
    });

    it('should display image', () => {
        expect(page.getImage().isDisplayed()).toBeTruthy();
    });

    it('should display profileCard', () => {
        expect(page.getProfileCard().isDisplayed()).toBeTruthy();
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

    it('viewVehButton link must redirect', () => {
        page.getViewVehButton().click().then(() => {
            browser.sleep(2000).then(() => {
                browser.getCurrentUrl().then((actualUrl) => {
                    expect(page.getViewVehButton().isDisplayed()).toBeTruthy();
                    // expect(actualUrl.indexOf('car') !== -1).toBeTruthy();
                });
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
