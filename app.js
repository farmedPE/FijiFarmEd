require('dotenv').config();
var restify = require('restify');
var builder = require('botbuilder');
var lodash = require('lodash');


// =========================================================
// Bot Setup
// =========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log('%s listening to %s', server.name, server.url);
})

// Create chat bot
var connector = new builder.ChatConnector({
  appId: '3d104161-5698-45d8-8236-a5aa991202cb',
  appPassword: 'is5Sdg2OxnJy7eg0KYwVXj2'
});

var bot = new builder.UniversalBot(connector)
server.post('/api/messages', connector.listen());

// Setup LUIS connection
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/4f58e80f-cb48-41ce-95f2-4427c21d1db8?subscription-key=30dad33bb3e142bfa07000c49875a401&timezoneOffset=0&verbose=true';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({recognizers: [recognizer]});
bot.dialog('/', dialog);

// =========================================================
// LUIS Dialogs
// =========================================================


dialog.matches('Greeting', [
  // Step 1
   function (session) {
       builder.Prompts.text(session, 'Bula! What is your name?');
   },
   // Step 2
   function (session, results) {
       session.endDialog('Hello %s!, Ask me a question about farming - I know a little about pests, the weather and crops', results.response);
   }
]);

dialog.matches('Crops', [
  function (session, results) {
    session.beginDialog('/SearchCropInfo', results)
  }
])

dialog.matches('Pest', [
  function (session, results) {
    session.beginDialog('/SearchPestInfo', results)
  }
])

dialog.matches('Weather.getForecast', [
  function (session, results) {
    session.beginDialog('/SearchWeatherInfo', results)
  }
])

dialog.matches('EndConvo', [
  function (session, results) {
    session.send(' Bye!')
  }
])

dialog.matches('MainMenu', [
  function (session, results) {
    session.beginDialog('/mainMenu', results)
  }
])

dialog.onDefault([
  function (session, results) {
    session.send('Sorry.. I did\'t understand that. Let me show you what I can do.')
    session.beginDialog('/mainMenu', results)
  }
])

// =========================================================
// Bots Dialogs
// =========================================================

var data = {}

// present the user with a main menu of choices they can select from
bot.dialog('/mainMenu', [
  function (session, results) {
    builder.Prompts.choice(session, 'I can do any of these, pick one!', ['Search for Crop Information', 'Search for Pest Information', 'Search for Weather'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        session.beginDialog('/SearchCropInfo');
        break;
      case 1:
        // Initiate "Search By Name" dialog
        session.beginDialog('/SearchPestInfo');
        break;
      case 2:
        // Initiate "Search By Time" dialog
        session.beginDialog('/SearchWeatherInfo');
        break;
    }
  }
])

// either extract the LUIS entity or ask the user for a day to search -- display the results
bot.dialog('/SearchCropInfo', [
  function (session, results, next) {
    // check if results.entities is undefiend
    if (typeof results !== 'undefined' && results.entities) {
      var day = builder.EntityRecognizer.findEntity(results.entities, 'Crop');
      if (!day) {
        builder.Prompts.text(session, 'What crop would you like to search for?');
      } else {
        next({ response: day.entity })
      }
    } else {
      // prompt the user for the text manually
      builder.Prompts.text(session, 'What crop would you like to search for?');
    }
  },
  function (session, results) {
    if (results.response) {
      session.send('Searching for information on %s. One moment.', results.response);
    }
  }
])

// either extract the LUIS entity or ask the user for a name to search -- display the results
bot.dialog('/SearchPestInfo', [
  function (session, results, next) {
    if (typeof results !== 'undefined' && results.entities) {
      var name = builder.EntityRecognizer.findEntity(results.entities, 'Diseases')
      if (!name) {
        builder.Prompts.text(session, 'What disease would you like to search about?');
      } else {
        next({ response: name.entity })
      }
    } else {
      // prompt the user for the text manually
      builder.Prompts.text(session, 'What disease would you like to search about?');
    }
  },
  function (session, results) {
    if (results.response) {
      session.send('Searching for information on %s. One moment.', results.response);
    }
  }
])

// either extract the LUIS entity or ask the user for a time to search -- display the results
bot.dialog('/SearchWeatherInfo', [
  function (session, results, next) {
    if (typeof results !== 'undefined' && results.entities) {
      var time = builder.EntityRecognizer.findEntity(results.entities, 'datetimeV2');
      if (!time) {
        builder.Prompts.text(session, 'When are you interested in the weather?');
      } else {
        next({ response: time.entity });
      }
    } else {
      // prompt the user for the text manually
      builder.Prompts.text(session, 'When are you interested in the weather?');
    }
  },
  function (session, results) {
    if (results.response) {
      session.send('Searching for information on weather for %s. One moment.', results.response);
    }
  }
])

//Sends greeting message when the bot is first added to a conversation
bot.on('conversationUpdate', function (message) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
            if (identity.id === message.address.bot.id) {
                var reply = new builder.Message()
                    .address(message.address)
                    .text('I\'m FarmEdBot, say hello!');
                bot.send(reply);
            }
        });
    }
});
