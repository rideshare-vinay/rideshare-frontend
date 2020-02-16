import { browser, by, element } from 'protractor';

export class ProfileDetailPage {

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

    getViewVehButton() {
        // TODO: get different element #viewVehButton cannot be used
        return element(by.className('oBut'));
    }

}
