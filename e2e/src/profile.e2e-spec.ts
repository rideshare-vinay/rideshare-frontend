import { browser, logging } from 'protractor';
import { ProfilePage } from './po/profile.po';

describe('App /login E2E tests', () => {
    let page: ProfilePage;

    beforeEach(() => {
        page = new ProfilePage();
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

    afterEach(async () => {
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
