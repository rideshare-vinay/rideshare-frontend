import { AppPage } from './po/app.po';
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

  describe('loginCard specific', () => {
    it('should display loginCard', () => {
      expect(page.getLoginCard().isDisplayed()).toBeTruthy();
    });
    it('login button should be disabled', () => {
      page.getAccount().sendKeys('');
      page.getUsername().sendKeys('');
      expect(page.getLoginButton().isEnabled()).toBeFalsy();
    });
    it('login button should be enabled', () => {
      page.getAccount().sendKeys('abc');
      page.getUsername().sendKeys('abc');
      expect(page.getLoginButton().isEnabled()).toBeTruthy();
    });
    it('login with valid inputs', () => {
      page.getAccount().sendKeys('Adney Jones1: Driver');
      page.getUsername().sendKeys('driver1');
      expect(page.getAccount().getAttribute('value')).toEqual('Adney Jones1: Driver');
      expect(page.getUsername().getAttribute('value')).toEqual('driver1');
      browser.ignoreSynchronization = true;
      page.getLoginButton().click().then(() => {
        browser.getCurrentUrl().then((actualUrl) => {
          expect(actualUrl.indexOf('login') !== -1).toBeTruthy();
        });
      });
    });
    it('login with invalid inputs', () => {
      page.getAccount().sendKeys('abc');
      page.getUsername().sendKeys('abc');
      browser.ignoreSynchronization = true;
      page.getLoginButton().click().then(() => {
        browser.getCurrentUrl().then((actualUrl) => {
          // TODO: get different element when UI done
          // expect(page.getLoginFailedMessage().isDisplayed()).toBeTruthy();
        });
      });
    });
    it('login with banned user inputs', () => {
      // TODO: mock 1 banned user acct
      page.getAccount().sendKeys('abc');
      page.getUsername().sendKeys('abc');
      browser.ignoreSynchronization = true;
      page.getLoginButton().click().then(() => {
        browser.getCurrentUrl().then((actualUrl) => {
          // TODO: get different element when UI done
          // expect(page.getLoginBannedMessage().isDisplayed()).toBeTruthy();
        });
      });
    });
    it('signup/create a new account must redirect', () => {
      browser.ignoreSynchronization = true;
      page.getCreateAcctLink().click().then(() => {
        browser.getCurrentUrl().then((actualUrl) => {
          expect(actualUrl.indexOf('register') !== -1).toBeTruthy();
        });
      });
    });
  });

  describe('navbarRideshare specific', () => {
    it('should display navbarRideshare', () => {
      expect(page.getNavbarRideshare().isDisplayed()).toBeTruthy();
    });
    it('signin link must redirect', () => {
      page.getSignInLink().click().then(() => {
        browser.sleep(2000).then(() => {
          browser.getCurrentUrl().then((actualUrl) => {
            expect(actualUrl.indexOf('login') !== -1).toBeTruthy();
          });
        });
      });
    });
    it('signup link must redirect', () => {
      browser.ignoreSynchronization = true;
      page.getSignUpLink().click().then(() => {
        browser.getCurrentUrl().then((actualUrl) => {
          expect(actualUrl.indexOf('register') !== -1).toBeTruthy();
        });
      });
    });
    it('admin link must redirect', () => {
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
