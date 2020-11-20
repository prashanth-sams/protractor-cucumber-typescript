import { browser, by, $ } from "protractor";
const { Given, When } = require("cucumber");
const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;
import { ApiPage } from "../pages/api.po";
import { logger } from '../support/logger';


const api: ApiPage = new ApiPage();

When('I enter the search api keyword', async (table) : Promise<any> => {
    logger(global['tcname'], 'api: ' + table.hashes()[0]['api'])
    await api.search.sendKeys(table.hashes()[0]['api']);
    await $("[title='ProtractorBrowser.prototype."+table.hashes()[0]['api']+"'] > a").click();
    return await expect(api.title.getText()).to.eventually.contain(table.hashes()[0]['api']);
});