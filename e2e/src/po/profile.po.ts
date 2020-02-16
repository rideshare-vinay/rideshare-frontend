import { browser, by, element } from 'protractor';

export class ProfilePage {

  navigateTo() {
    return browser.get('home/drivers');
  }

  getImage() {
    return element(by.className('responsive'));
  }

  getProfileCard() {
    return element(by.tagName('mat-card'));
  }

  getLogoutLink() {
    return element(by.tagName('a'));
  }

}
