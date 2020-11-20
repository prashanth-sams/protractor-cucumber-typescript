import { browser, by } from "protractor";
import { GuidePage } from "../pages/guide.po";
const { When, Then } = require("cucumber");
const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;
import { logger } from '../support/logger';


const guide: GuidePage = new GuidePage();

When('I click on {string}', async (link: string) => {
    logger(global['tcname'], 'link: ' + link)

    if(link == 'Test Suites') {
        return await guide.suite.click();
    } else if (link == 'Page Objects'){
        return await guide.pageobjects.click();
    }
    
});

Then('I verify the {string}', async (link: string) => {
    return await expect(browser.isElementPresent(guide.logo)).to.eventually.equal(true);
});
