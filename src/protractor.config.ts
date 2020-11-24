import * as path from "path";
import { browser, Config } from "protractor";
import { Reporter } from "../src/support/reporter";
const jsonReports = process.cwd() + "/reports/json";
const htmlReport = process.cwd() + "/reports/html";

export const config: Config = {

    seleniumAddress: "http://127.0.0.1:4444/wd/hub",

    SELENIUM_PROMISE_MANAGER: true,

    baseUrl: "https://www.protractortest.org",

    capabilities: {
        browserName: "chrome",
        shardTestFiles: true,
        maxInstances: 2,
        chromeOptions: {
            args: ['disable-infobars', 'no-sandbox']
        }
    },

    directConnect: true,

    framework: "custom",
    
    frameworkPath: require.resolve("protractor-cucumber-framework"),

    specs: [
        "../../src/features/**/*.feature",
    ],

    onPrepare: async () => {
        await browser.waitForAngularEnabled(true);
        await browser.manage().timeouts().implicitlyWait(15000);
        await browser.manage().window().maximize();
        Reporter.createDirectory(jsonReports, htmlReport);
    },

    cucumberOpts: {
        compiler: "ts:ts-node/register",
        format: ["json:./reports/json/cucumber_report.json", 'rerun:./reports/rerun.txt'],
        require: ["../../typeScript/src/step_definitions/*.steps.js", "../../typeScript/src/support/*.js", "../../typeScript/src/pages/*.po.js"],
        ignoreUncaughtExceptions: true,
        strict: true,
        tags: "@api or @guide"
    },

    onComplete: () => {
        Reporter.createHTMLReport();
    },

    allScriptsTimeout: 120000,

    getPageTimeout: 60000,
    
    restartBrowserBetweenTests: false
};
