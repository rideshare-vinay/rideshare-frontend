import { browser, by, element } from 'protractor';

export class SignUpPage {

    navigateTo() {
        return browser.get('register');
    }

    getRegisterForm() {
        return element(by.className('register-form'));
    }

    getUserName() {
        return element(by.name('userName'));
    }

    getFirstName() {
        return element(by.name('firstName'));
    }

    getLastName() {
        return element(by.name('lastName'));
    }

    getPhone() {
        return element(by.name('phone'));
    }

    getEmail() {
        return element(by.name('email'));
    }

    getAddress() {
        return element(by.id('address'));
    }

    getLocation() {
        return element(by.id('location'));
    }

    getBatchNumber() {
        return element(by.id('batchNumber'));
    }

    getSubmitButton() {
        return element(by.className('button'));
    }

}
