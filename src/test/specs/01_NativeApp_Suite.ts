import NativeApp from '../pages/nativeAppExample';

describe('Native App Test Suite Example', () => {

 //   before(async () => {
 //       await browser.errorHandler()
 //  })

    afterEach(async () => {
        await browser.resetApp()
    })

    it('Should not be able to login with invalid email format', async () => {
        await NativeApp.clickonLoginTab()
        await NativeApp.fillUserCred('anythingtest.com', 'Amr')
        await NativeApp.clickLoginButton()
        await browser.takeScreenshot()
        await expect(NativeApp.errorTooltip('Please enter a valid email address')).toBeDisplayed()
    });

    it('Should not be able to login with invalid pass crtieria', async () => {
        await NativeApp.clickonLoginTab()
        await NativeApp.fillUserCred('anything@test.com', 'Amr')
        await NativeApp.clickLoginButton()
        await browser.takeScreenshot()
        await expect(NativeApp.errorTooltip('Please enter at least 8 characters')).toBeDisplayed()
    });

});
