Feature: Protractor API Search

Background: Protractor API page
  Given I am on "Protractor API" page

@api
Scenario: API Search
  When I enter the search api keyword
    |  api      |
    |  refresh  |