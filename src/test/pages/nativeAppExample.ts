import AllureReporter from '@wdio/allure-reporter';

class NativeApp {

    /* =====================================================================  ELEMENTS ============================================================================== */

    get loginTab() { return $('~Login') }
    get emailInput() { return $(`~input-email`) }
    get passwordInput() { return $('~input-password') }
    get loginButton() { return $('~button-LOGIN') }
    async errorTooltip(error: string) {
        switch (driver.isAndroid) {
            case true:
                return $(`android=.text("${error}")`)
            default:
                return $(`-ios predicate string:type == "XCUIElementTypeStaticText" AND value == "${error}"`)
        }
    }
    /* ========================================================================= ACTIONS ================================================================================ */

    async clickonLoginTab() {
        await this.loginTab.waitForDisplayed()
        await this.loginTab.click()
    }

    async fillUserCred(email: string, pass: string) {
        await this.emailInput.setValue(email)
        await this.passwordInput.setValue(pass)
    }

    async clickLoginButton() {
        await this.loginButton.click()
    }



}

export default new NativeApp();
