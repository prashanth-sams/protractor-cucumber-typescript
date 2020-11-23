let { task, desc } = require('jake');
require('dotenv').config();


desc('This is the default task.');
task('default', function () {
  console.log('parent task');
});

desc('This is some other task. It depends on the default task');
task('slack', ['default'], function (environment) {
  const https = require('https');
  const yourWebHookURL = 'https://hooks.slack.com/services/'+process.env.SLACK_TOKEN;
  const userAccountNotification = {
    'username': 'Protractor | Test Report',
    'text': '@everyone @here Done with your tests!',
    'icon_emoji': ':popcorn:',
    'attachments': [{ 
      'color': '#eed140',
      
      'fields': [
        {
          'title': 'Environment',
          'value': environment,
          'short': true // long fields will be full width
        },
        {
          'title': 'Total Scenarios',
          'value': '331',
          'short': true
        },
        {
          'title': 'Status',
          'value': 'PASSED',
          'short': true
        },
        {
          'title': 'Time Taken',
          'value': '3 min  30 secs',
          'short': true
        }
      ],
      "actions": [
        {
          "type": "button",
          "text": "See test results",
          "url": "http://example.com" // url the button will take the user if clicked
        },
      ],
    }]
  };

  /**
   * Handles the actual sending request. 
   * We're turning the https.request into a promise here for convenience
   * @param webhookURL
   * @param messageBody
   * @return {Promise}
   */
  function sendSlackMessage (webhookURL, messageBody) {
    // make sure the incoming message body can be parsed into valid JSON
    try {
      messageBody = JSON.stringify(messageBody);
    } catch (e) {
      throw new Error('Failed to stringify messageBody', e);
    }

    // Promisify the https.request
    return new Promise((resolve, reject) => {
      // general request options, we defined that it's a POST request and content is JSON
      const requestOptions = {
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        }
      };

      // actual request
      const req = https.request(webhookURL, requestOptions, (res) => {
        let response = '';


        res.on('data', (d) => {
          response += d;
        });

        // response finished, resolve the promise with data
        res.on('end', () => {
          resolve(response);
        })
      });

      // there was an error, reject the promise
      req.on('error', (e) => {
        reject(e);
      });

      // send our message body (was parsed to JSON beforehand)
      req.write(messageBody);
      req.end();
    });
  }

  // main
  (async function () {
    if (!yourWebHookURL) {
      console.error('Please fill in your Webhook URL');
    }

    try {
      const slackResponse = await sendSlackMessage(yourWebHookURL, userAccountNotification);
      console.log('Message response', slackResponse);
    } catch (e) {
      console.error('There was a error with the request', e);
    }
  })();

  function readJsonValues() {
    fetch(process.cwd() + "/reports/html/cucumber_reporter.html.json")
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
  }

});