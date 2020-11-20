Feature: Protractor Guide

Background: Protractor Guide page
  Given I am on "Protractor Guide" page

@guide
Scenario Outline: Verify Protractor Guides
  When I click on "<link>"
  Then I verify the "<link>"

  Examples:
    |  link          |
    |  Test Suites   |
    |  Page Objects  |