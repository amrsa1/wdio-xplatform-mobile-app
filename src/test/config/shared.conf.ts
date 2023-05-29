import type { Options } from '@wdio/types'
import commands from '../utils/customCommands';

export const config: Options.Testrunner = {
    runner: 'local',
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            project: './tsconfig.json',
            transpileOnly: true
        }
    },
    maxInstances: 1,
    logLevel: 'trace',
    bail: 0,
    waitforTimeout: 25000,
    connectionRetryTimeout: 350000,
    connectionRetryCount: 2,
    wait: 7000,
    interval: 200, 

    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 200000,
        retries: 1
    },

    before: () => {
        commands();
    },
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    },
    reporters: ['spec', ['allure', {
        outputDir: 'report/allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
        disableMochaHooks: true
    }]],
    capabilities: undefined
}
