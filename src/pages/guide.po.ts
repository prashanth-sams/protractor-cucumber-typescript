import { $, by, element, ElementFinder } from "protractor";
import { BasePage } from "./base.po";

export class GuidePage {
    public url: string;
    public suite: ElementFinder;
    public logo: ElementFinder;
    public pageobjects: ElementFinder;

    constructor() {
        this.url = '/#/style-guide';
        this.suite = element(by.xpath("//*[contains(@href,'test-suites')]"));
        this.pageobjects = element(by.xpath("//*[contains(@href,'#page-objects')]"));
        this.logo = $(".protractor-logo");
    }
}
