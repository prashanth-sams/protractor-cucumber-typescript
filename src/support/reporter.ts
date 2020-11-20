import * as reporter from "cucumber-html-reporter";
import * as fs from "fs";
import * as mkdirp from "mkdirp";
import * as path from "path";
const jsonReports = path.join(process.cwd(), "/reports/json/");
const htmlReports = path.join(process.cwd(), "/reports/html");
const screenshots = path.join(process.cwd(), "/screenshots/");

const cucumberReporterOptions = {
    theme: 'bootstrap',
    jsonDir: jsonReports,
    output: htmlReports + '/cucumber_reporter.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    metadata: {
        'Application': 'Protractor Website',
        'Test Environment': 'STAGING',
        'Browser': 'Chrome 87',
        'Platform': 'MAC OS',
        'Parallel': 'Scenarios'
    },
    screenshotsDirectory: screenshots,
    storeScreenshots: true
};

export class Reporter {

    public static createDirectory(json: string, html: string) {
        if (!fs.existsSync(json)) {
            mkdirp.sync(json);
            mkdirp.sync(html);
        }
    }

    public static createHTMLReport() {
        try {
            reporter.generate(cucumberReporterOptions);
        } catch (err) {}
    }
}
