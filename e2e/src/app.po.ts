import { browser, by, element } from 'protractor';

export class AppPage {

  navigateTo() {
    return browser.get('login');
  }

  getNavbarRideshare() {
    return element(by.id('navbarRideshare'));
  }

  getTopBorder() {
    return element(by.className('topBorder'));
  }

  getImage() {
    return element(by.className('responsive'));
  }

  getLoginCard() {
    return element(by.className('loginCard'));
  }

  getSignInLink() {
    return element(by.partialLinkText('SIGN IN'));
  }

  getSignUpLink() {
    return element(by.partialLinkText('SIGN UP'));
  }

  getAdminLink() {
    return element(by.partialLinkText('ADMIN'));
  }
  
}
