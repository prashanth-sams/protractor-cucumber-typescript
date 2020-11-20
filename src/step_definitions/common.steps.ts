import { browser, by, $ } from "protractor";
import { GuidePage } from "../pages/guide.po";
import { ApiPage } from "../pages/api.po";
const { Given, When } = require("cucumber");
const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;

const guide: GuidePage = new GuidePage();
const api: ApiPage = new ApiPage();


Given('I am on {string} page', {timeout: 100 * 1000}, async (page: string) => {
    if(page == 'Protractor API') {
        await browser.get(api.url);
        await expect(browser.getCurrentUrl()).to.eventually.contain('/api');
    } else if (page == 'Protractor Guide'){
        await browser.get(guide.url);
        await expect(browser.getCurrentUrl()).to.eventually.contain('/style-guide');
    }
    return await expect(browser.getTitle()).to.eventually.contain('Protractor');
});