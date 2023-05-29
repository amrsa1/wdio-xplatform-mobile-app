import { exec, ExecException } from 'child_process';
import caps from './caps';

const emulatorCaps = caps.emulator[0]['appium:options']
const simulatorCaps= caps.simulator[0]['appium:options']

let appData: { appPackage: string; appActivity: string; };

async function getPackageAndActivity() {
  const appPackage = await driver.getCurrentPackage();
  const appActivity = await driver.getCurrentActivity();

  appData = {
    appPackage: appPackage,
    appActivity: appActivity
  };
}

async function resetApp() {
//   driver.isAndroid ?? await getPackageAndActivity()
  await driver.terminateApp(driver.isAndroid ? emulatorCaps.appPackage : simulatorCaps.bundleId)
  await driver.activateApp(driver.isAndroid ? emulatorCaps.appPackage : simulatorCaps.bundleId)

//   if (driver.isAndroid) {
//       await driver.isAndroid await getPackageAndActivity()
//       await driver.terminateApp(appData.appPackage)
//       await driver.activateApp(appData.appPackage)
//   } else {
//       await driver.closeApp()
//       await driver.launchApp()
//   }
  
//   switch (driver.isAndroid) {
//     case true:
//       const appPackage = await driver.getCurrentPackage();
//       const appActivity = await driver.getCurrentActivity();
//      // const adbCmd = `adb shell pm clear ${emulatorCaps.appPackage}`;
//      // const openApp = `adb shell am start -n ${emulatorCaps.appPackage}/${emulatorCaps.appActivity}`;
//       const adbCmd = `adb shell pm clear ${appPackage}`;
//       const openApp = `adb shell am start -n ${appPackage}/${appActivity}`;
//       exec(adbCmd, (error: ExecException | null) => {
//         if (error) {
//           console.error(`exec error: ${error}`);
//         } else {
//           exec(openApp);
//         }
//       });
//       break;
//     default:
//       await driver.closeApp()
//       await driver.launchApp()
//       break;
//   }

}

async function errorHandler() {

  switch (driver.isAndroid) {
    case true:
      const appActivity = await driver.getCurrentActivity();
      console.log('here1', appActivity)

      const stopUi = `adb shell am force-stop com.android.systemu`;
      const getCurrentActivity = `adb shell dumpsys window 2>/dev/null | grep -i mCurrentFocus`;
      console.log('here2', exec(getCurrentActivity))

      exec(getCurrentActivity, (error: ExecException | null) => {
        if (error) {
          console.error(`exec error: ${error}`);
          exec(stopUi)

        } else {
          console.log(`nothing to do`, exec(stopUi));
        }
      });
      break;
  }

}

export default function CustomCommands() {
  browser.addCommand('resetApp', resetApp);
  browser.addCommand('errorHandler', errorHandler);

}
