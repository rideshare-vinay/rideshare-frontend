import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('App /login E2E tests', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display topBorder', () => {
    expect(page.getTopBorder().isDisplayed()).toBeTruthy();
  });

  it('should display image', () => {
    expect(page.getImage().isDisplayed()).toBeTruthy();
  });

  it('should display login Card', () => {
    expect(page.getLoginCard().isDisplayed()).toBeTruthy();
  });

  describe('navbarRideshare specific', () => {
    it('should display navbarRideshare', () => {
      expect(page.getNavbarRideshare().isDisplayed()).toBeTruthy();
    });
    it('signin link must clickable', () => {
      page.getSignInLink().click().then(() => {
        browser.sleep(3000).then(() => {
          browser.getCurrentUrl().then((actualUrl) => {
            expect(actualUrl.indexOf('login') !== -1).toBeTruthy();
          });
        });
      });
    });
    it('signup link must clickable', () => {
      browser.ignoreSynchronization = true;
      page.getSignUpLink().click().then(() => {
        browser.getCurrentUrl().then((actualUrl) => {
          expect(actualUrl.indexOf('register') !== -1).toBeTruthy();
        });
      });
    });
    it('admin link must clickable', () => {
      browser.ignoreSynchronization = true;
      page.getAdminLink().click().then(() => {
        browser.getCurrentUrl().then((actualUrl) => {
          expect(actualUrl.indexOf('login/admin') !== -1).toBeTruthy();
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
