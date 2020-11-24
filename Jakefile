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
    'text': '@channel Your tests are cooked!',
    'icon_emoji': ':popcorn:',
    'attachments': [{ 
      'color': statusColor(),

      'fields': [
        {
          'title': 'Environment',
          'value': environment,
          'short': true // long fields will be full width
        },
        {
          'title': 'Total Scenarios',
          'value': scenarioCount(),
          'short': true
        },
        {
          'title': 'Status',
          'value': status()  + '    ' + ':champagne:  ' + passedCount() + '    :comet:  ' + failedCount(),
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

  function scenarioCount() {
    var json = require(process.cwd() + "/reports/html/cucumber_reporter.html.json");

    var [i, j, scenario] = [0,0,0,0];
    while(i != Object.keys(json).length) {
      while(j != Object.keys(json[i]['elements']).length) {
        scenario += 1, j += 1;
      }
      j = 0, i += 1;
    };
    
    return scenario;
  };

  function failedCount() {
    var json = require(process.cwd() + "/reports/html/cucumber_reporter.html.json");

    var [i, j, k, scenario, passed, failed] = [0, 0, 0, 0, 0, 0];
    while(i != Object.keys(json).length) {
      while(j != Object.keys(json[i]['elements']).length) {
        while(k != Object.keys(json[i]['elements'][j]['steps']).length) {
          if(Object.values(json[i]['elements'][j]['steps'][k]['result']['status']).join().replace(/,/g,'') == 'failed') {
            failed += 1;
            break;
          }
          k += 1;
        }
        scenario += 1, j += 1;
        k = 0;
      }
      j = 0, i += 1;
    };
    
    return failed;
  };

  function passedCount() {
    var json = require(process.cwd() + "/reports/html/cucumber_reporter.html.json");

    var [i, j, k, scenario, passed] = [0, 0, 0, 0, 0];
    while(i != Object.keys(json).length) {
      while(j != Object.keys(json[i]['elements']).length) {
        while(k != Object.keys(json[i]['elements'][j]['steps']).length) {
          if(Object.values(json[i]['elements'][j]['steps'][k]['result']['status']).join().replace(/,/g,'') == 'failed') {
            break;
          } else if((Object.values(json[i]['elements'][j]['steps'][k]['result']['status']).join().replace(/,/g,'') == 'passed') && (k+1 == Object.keys(json[i]['elements'][j]['steps']).length)) {
            passed += 1;
          }
          k += 1;
        }
        scenario += 1, j += 1;
        k = 0;
      }
      j = 0, i += 1;
    };
    
    return passed;
  };

  function status() {
    if (failedCount() > 0) {
      return 'FAILED';
    } else {
      return 'PASSED';
    }
  };

  function statusColor() {
    if (failedCount() > 0) {
      return '#bd2d0d';
    } else {
      return '#0aa30a';
    }
  };
});