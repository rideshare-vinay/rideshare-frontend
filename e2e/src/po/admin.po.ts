import { browser, by, element } from 'protractor';

export class AdminPage {

    navigateTo() {
        return browser.get('login/admin');
    }

    getImage() {
        return element(by.className('responsive'));
    }

    getLoginCard() {
        return element(by.className('example-card'));
    }

    getSignInLink() {
        return element(by.partialLinkText('Sign In'));
    }

    getAccountOptions() {
        return element.all(by.tagName('mat-select'));
    }

    getUsername() {
        return element(by.name('userName'));
    }

    getLoginButton() {
        return element(by.className('button'));
    }

    getErr() {
        return element(by.className('ng-star-inserted'));
    }

    // getLoginBannedMessage() {
    //   return element(by.className('alert'));
    // }

}
