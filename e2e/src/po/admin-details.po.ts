import { browser, by, element } from 'protractor';

export class AdminDetailPage {

    navigateTo() {
        return browser.get('admin');
    }

    getLogoutLink() {
        return element(by.tagName('a'));
    }

    getSearchBar() {
        return element(by.tagName('input'));
    }

    getSearchButton() {
        return element(by.className('btn'));
    }

    getTable() {
        return element(by.tagName('table'));
    }

    getCaption() {
        return element(by.tagName('caption'));
    }

    getValues() {
        return element.all(by.tagName('td'));
    }

    getBanButtons() {
        // TODO: get different element for ban/unban
        return element.all(by.tagName('button'));
    }

    getActiveValues() {
        const tabledata = element.all(by.tagName('table'));
        const rows = tabledata.all(by.tagName('tr'));
        return rows.all(by.tagName('td'));
    }

}
