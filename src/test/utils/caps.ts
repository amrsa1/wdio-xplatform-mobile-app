class Caps {

  emulator =
    [{
      'platformName': 'android',
      'appium:options': {
        'deviceName': process.env.CI ? process.env.EMULATOR_NAME : 'Nexus',
        'platformVersion': process.env.CI ? process.env.EMULATOR_VERSION : '13',
        'automationName': 'uiautomator2',
        'appPackage': 'com.wdiodemoapp',
        'appWaitPackage': 'com.wdiodemoapp',
        'appActivity': 'com.wdiodemoapp.MainActivity',
        'appWaitActivity': 'com.wdiodemoapp.MainActivity',
        'uiautomator2ServerLaunchTimeout': 200000,
        'uiautomator2ServerInstallTimeout': 200000,
        'appWaitForLaunch': true,
        'autoGrantPermissions': true,
        'adbExecTimeout': 200000,
        'androidInstallTimeout': 150000,
        'ignoreHiddenApiPolicyError': true,
        'noReset': true,
        'fullReset': false
      }
    }]

  simulator =
    [{
      platformName: 'iOS',
      'appium:options': {
        'deviceName': process.env.CI ? process.env.IPHONE_MODEL : 'Iphone-13',
        'platformVersion': process.env.CI ? process.env.IOS_VERSION : '15.5',
        'automationName': 'XCUITest',
        'bundleId': 'org.wdioNativeDemoApp',
        'app': './app/iOS-Simulator-NativeDemoApp-0.4.0.app.zip',
        'udid': process.env.CI ? process.env.SIMULATOR_UDID : '15A098DB-B8A0-4D6A-9057-23FF1F0F0D9B',
        'useNewWDA': true,
        'usePrebuiltWDA': false,
        'wdaConnectionTimeout': 180000,
        'appWaitForLaunch': true,
        'noReset': true,
        'fullReset': false
      }
    }]
}

export default new Caps();
