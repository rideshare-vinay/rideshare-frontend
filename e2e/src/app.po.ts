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

  getAccount() {
    return element(by.name('chosenUserFullName'));
  }

  getUsername() {
    return element(by.name('userName'));
  }

  getLoginButton() {
    return element(by.className('button'));
  }

  // getLoginFailedMessage() {
  //   return element(by.className('alert-danger'));
  // }

  // getLoginBannedMessage() {
  //   return element(by.className('alert'));
  // }

  getCreateAcctLink() {
    return element(by.partialLinkText('Sign Up'));
  }

}
