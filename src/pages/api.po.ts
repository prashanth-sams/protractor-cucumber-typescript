import { $, ElementFinder } from "protractor";

export class ApiPage {
    public url: string;
    public search: ElementFinder;
    public title: ElementFinder;

    constructor() {
        this.url = '/#/api';
        this.search = $("[type='search']");
        this.title = $(".api-title")
    }
}
