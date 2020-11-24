# Protractor Cucumber Typescript
> Boilerplate Framework built using `Protractor-Cucumber-Typescript` tools

## Features
- [x] Page Object Pattern
- [x] Hooks
- [x] Parallel testing
- [x] HTML Reporter
- [x] Screenshots on failure
- [x] Loggers
- [x] TS task scheduler
- [x] Slack integration
- [x] Docker integration - Zalenium as a load balancer

## Installation
* Install libraries
    ```
    npm install
    npm install -g jake
    ```

* Webdriver update lets you download the **chrome & gecko driver** binaries locally for you!
    ```
    npm run webdriver-update
    ``` 

* Now, start selenium server
    ```
    npm run webdriver-start
    ```

## Test Runner

* Clean reports, compile `.ts` to `.js` scripts, and execute tests
    ```
    npm test
    ```
    or
    ```
    bash runner/smoke.sh
    ```