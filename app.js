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

//=========================//
//Greetings and general conversation
//=========================//
dialog.matches('greeting', [
  // Step 1
   function (session) {
       builder.Prompts.text(session, 'Bula! What is your name?');
   },
   // Step 2
   function (session, results) {
       session.endDialog('Hello %s!, Ask me a question about farming - I know a little about pests, the weather and crops', results.response);
   }
]);

dialog.matches('help', [
  function (session, results) {
    session.beginDialog('/help', results)
  }
])

dialog.matches('endconvo', [
  function (session, results) {
    session.send(' Bye!')
  }
])

dialog.matches('mainmenu', [
  function (session, results) {
    session.beginDialog('/mainmenu', results)
  }
])

dialog.onDefault([
  function (session, results) {
    session.send('Sorry.. I did\'t understand that. Let me show you what I can do.')
    session.beginDialog('/mainMenu', results)
  }
])

//=========================//
//Crop Intents for General Information
//=========================//
dialog.matches('okra', [
  function (session, results) {
    session.beginDialog('/okra', results)
  }
])

dialog.matches('pawpaw', [
  function (session, results) {
    session.beginDialog('/pawpaw', results)
  }
])

dialog.matches('longbean', [
  function (session, results) {
    session.beginDialog('/longbean', results)
  }
])

dialog.matches('pumpkin', [
  function (session, results) {
    session.beginDialog('/pumpkin', results)
  }
])

dialog.matches('cabbage', [
  function (session, results) {
    session.beginDialog('/cabbage', results)
  }
])

dialog.matches('cucumber', [
  function (session, results) {
    session.beginDialog('/cucumber', results)
  }
])

dialog.matches('chilli', [
  function (session, results) {
    session.beginDialog('/chilli', results)
  }
])

dialog.matches('cowpeas', [
  function (session, results) {
    session.beginDialog('/cowpeas', results)
  }
])

dialog.matches('tomato', [
  function (session, results) {
    session.beginDialog('/tomato', results)
  }
])

dialog.matches('eggplant', [
  function (session, results) {
    session.beginDialog('/eggplant', results)
  }
])

dialog.matches('cassava', [
  function (session, results) {
    session.beginDialog('/cassava', results)
  }
])

dialog.matches('yams', [
  function (session, results) {
    session.beginDialog('/yams', results)
  }
])

dialog.matches('tobacco', [
  function (session, results) {
    session.beginDialog('/tobacco', results)
  }
])

//=========================//
//diseases intents
//=========================//
dialog.matches('nitrogendeficiency', [
  function (session, results) {
    session.beginDialog('/nitrogendeficiency', results)
  }
])

dialog.matches('blackspot', [
  function (session, results) {
    session.beginDialog('/blackspot', results)
  }
])

dialog.matches('anthracnose', [
  function (session, results) {
    session.beginDialog('/anthracnose', results)
  }
])

dialog.matches('ringspot', [
  function (session, results) {
    session.beginDialog('/ringspot', results)
  }
])

//=========================//
//pest intents
//=========================//
dialog.matches('thrips', [
  function (session, results) {
    session.beginDialog('/thrips', results)
  }
])

dialog.matches('whitefly', [
  function (session, results) {
    session.beginDialog('/whitefly', results)
  }
])

dialog.matches('beanpodborer', [
  function (session, results) {
    session.beginDialog('/beanpodborer', results)
  }
])

dialog.matches('cornearworm', [
  function (session, results) {
    session.beginDialog('/cornearworm', results)
  }
])

dialog.matches('cottonbollworm', [
  function (session, results) {
    session.beginDialog('/cottonbollworm', results)
  }
])

dialog.matches('cutworm', [
  function (session, results) {
    session.beginDialog('/cutworm', results)
  }
])

dialog.matches('aphids', [
  function (session, results) {
    session.beginDialog('/aphids', results)
  }
])

dialog.matches('scaleinsect', [
  function (session, results) {
    session.beginDialog('/scaleinsect', results)
  }
])

dialog.matches('pestid', [
  function (session, results) {
    session.beginDialog('/pestid', results)
  }
])


//=========================//
//intents for pesticides
//=========================//
dialog.matches('orthene', [
  function (session, results) {
    session.beginDialog('/orthene', results)
  }
])

dialog.matches('confidol', [
  function (session, results) {
    session.beginDialog('/confidol', results)
  }
])

dialog.matches('multiguard', [
  function (session, results) {
    session.beginDialog('/multiguard', results)
  }
])

dialog.matches('sunseed', [
  function (session, results) {
    session.beginDialog('/sunseed', results)
  }
])

dialog.matches('rabon', [
  function (session, results) {
    session.beginDialog('/rabon', results)
  }
])

dialog.matches('rogor', [
  function (session, results) {
    session.beginDialog('/rogor', results)
  }
])

dialog.matches('glyphosate', [
  function (session, results) {
    session.beginDialog('/glyphosate', results)
  }
])

//=========================//
//intents for fertilisers
//=========================//
dialog.matches('hydrocomplex', [
  function (session, results) {
    session.beginDialog('/hydrocomplex', results)
  }
])

dialog.matches('urea', [
  function (session, results) {
    session.beginDialog('/urea', results)
  }
])

dialog.matches('npk', [
  function (session, results) {
    session.beginDialog('/npk', results)
  }
])

dialog.matches('borex', [
  function (session, results) {
    session.beginDialog('/borex', results)
  }
])

//=========================//
//function to identify machinery
//=========================//
dialog.matches('tractor', [
  function (session, results) {
    session.beginDialog('/tractor', results)
  }
])

dialog.matches('waterpump', [
  function (session, results) {
    session.beginDialog('/waterpump', results)
  }
])

dialog.matches('seeder', [
  function (session, results) {
    session.beginDialog('/seeder', results)
  }
])

dialog.matches('rotaryhoe', [
  function (session, results) {
    session.beginDialog('/rotaryhoe', results)
  }
])

dialog.matches('discplough', [
  function (session, results) {
    session.beginDialog('/discplough', results)
  }
])

dialog.matches('harvester', [
  function (session, results) {
    session.beginDialog('/harvester', results)
  }
])

//=========================//
//function to check weather
//=========================//
dialog.matches('weathertoday', [
  function (session, results) {
    session.beginDialog('/weathertoday', results)
  }
])

dialog.matches('weatherweek', [
  function (session, results) {
    session.beginDialog('/weatherweek', results)
  }
])

dialog.matches('weathermonth', [
  function (session, results) {
    session.beginDialog('/weathermonth', results)
  }
])

//=========================//
//functions for buying/selling
//=========================//
dialog.matches('buyingseeds', [
  function (session, results) {
    session.beginDialog('/buyingseeds', results)
  }
])

dialog.matches('buyingequipment', [
  function (session, results) {
    session.beginDialog('/buyingequipment', results)
  }
])

dialog.matches('sellingseeds', [
  function (session, results) {
    session.beginDialog('/sellingseeds', results)
  }
])

dialog.matches('sellingequipment', [
  function (session, results) {
    session.beginDialog('/sellingequipment', results)
  }
])

dialog.matches('marketplacecrops', [
  function (session, results) {
    session.beginDialog('/marketplacecrops', results)
  }
])

//=========================//
//functions for soil
//=========================//
dialog.matches('soilph', [
  function (session, results) {
    session.beginDialog('/soilph', results)
  }
])

dialog.matches('soiltype', [
  function (session, results) {
    session.beginDialog('/soiltype', results)
  }
])

dialog.matches('soilissues', [
  function (session, results) {
    session.beginDialog('/soilissues', results)
  }
])
//

// =========================================================
// Bots Dialogs from the main menu
// =========================================================

var data = {}

//=========================//
// present the user with a main menu of choices they can select from
//=========================//
bot.dialog('/mainmenu', [
  function (session, results) {
    builder.Prompts.choice(session, 'I can do any of these, pick one!', ['Search for Crop Information', 'Search for Pest Information', 'Search for Disease ', 'Search for Pesticides', 'Search for Weather', 'Search for Fertilisers', 'The Market','Search for Machinery', 'Soil Information'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        session.beginDialog('/crops');
        break;
      case 1:
        // Initiate "Search By Name" dialog
        session.beginDialog('/pest');
        break;
      case 2:
        // Initiate "Search By Name" dialog
        session.beginDialog('/diseases');
        break;
      case 3:
        // Initiate "Search By Name" dialog
        session.beginDialog('/pesticides');
        break;
      case 4:
        // Initiate "Search By Name" dialog
        session.beginDialog('/weather');
        break;
      case 5:
        // Initiate "Search By Name" dialog
        session.beginDialog('/fertiliser');
        break;
      case 6:
        // Initiate "Search By Name" dialog
        session.beginDialog('/market');
        break;
      case 7:
        // Initiate "Search By Name" dialog
        session.beginDialog('/machinery');
        break;
      case 8:
        // Initiate "Search By Name" dialog
        session.beginDialog('/soil');
        break;
    }
  }
])

//=========================//
//function to identiy crop intent from the main menu
//=========================//
bot.dialog('/crops', [
  function (session, results) {
    builder.Prompts.choice(session, 'Which crop would you like information on?', ['Okra', 'Eggplant', 'Long Bean', 'Pumpkin', 'Cabbage', 'Chilli', 'Paw Paw', 'Tomato', 'Cucumber', 'Cow Peas', 'Cassava', 'Yams', 'Tobacco'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        session.beginDialog('/okra');
        break;
      case 1:
        // Initiate "Search By Name" dialog
        session.beginDialog('/eggplant');
        break;
      case 2:
        // Initiate "Search By Name" dialog
        session.beginDialog('/longbean');
        break;
      case 3:
        // Initiate "Search By Name" dialog
        session.beginDialog('/pumpkin');
        break;
      case 4:
        // Initiate "Search By Name" dialog
        session.beginDialog('/cabbage');
        break;
      case 5:
        // Initiate "Search By Name" dialog
        session.beginDialog('/chilli');
        break;
      case 6:
        // Initiate "Search By Time" dialog
        session.beginDialog('/pawpaw');
        break;
      case 7:
        // Initiate "Search By Time" dialog
        session.beginDialog('/tomato');
        break;
      case 8:
        // Initiate "Search By Time" dialog
        session.beginDialog('/cucumber');
        break;
      case 9:
        // Initiate "Search By Time" dialog
        session.beginDialog('/cowpeas');
        break;
      case 10:
        // Initiate "Search By Time" dialog
        session.beginDialog('/cassava');
        break;
      case 11:
        // Initiate "Search By Time" dialog
        session.beginDialog('/yams');
        break;
      case 12:
        // Initiate "Search By Time" dialog
        session.beginDialog('/tobacco');
        break;
    }
  }
])

//=========================//
//function to identiy pest intent from the main menu
//=========================//
bot.dialog('/pest', [
  function (session, results) {
    builder.Prompts.choice(session, 'Which would you like information on?', ['Thrips', 'White Fly', 'Bean Pod Borer', 'Corn Earworm', 'Cotton Bollworm', 'Cutworm', 'Aphids', 'Scale Insect', 'Help me identify a pest'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        session.beginDialog('/thrips');
        break;
      case 1:
        // Initiate "Search By Name" dialog
        session.beginDialog('/whitefly');
        break;
      case 2:
        // Initiate "Search By Name" dialog
        session.beginDialog('/beanpodborer');
        break;
      case 3:
        // Initiate "Search By Name" dialog
        session.beginDialog('/cornearworm');
        break;
      case 4:
        // Initiate "Search By Name" dialog
        session.beginDialog('/cottonbollworm');
        break;
      case 5:
        // Initiate "Search By Name" dialog
        session.beginDialog('/cutworm');
        break;
      case 6:
        // Initiate "Search By Time" dialog
        session.beginDialog('/aphids');
        break;
      case 7:
        // Initiate "Search By Time" dialog
        session.beginDialog('/scaleinsect');
        break;
      case 8:
        // Initiate "Search By Time" dialog
        session.beginDialog('/pestid');
        break;
      }
  }
])

//=========================//
// function to identity a disease intent from the main menu
//=========================//
bot.dialog('/diseases', [
  function (session, results) {
    builder.Prompts.choice(session, 'Which would you like information on?', ['Nitrogen Deficiency', 'Black Spot', 'Anthracnose', 'Ring Spot', 'Help me identify a disease'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        session.beginDialog('/nitrogendeficiency');
        break;
      case 1:
        // Initiate "Search By Name" dialog
        session.beginDialog('/blackspot');
        break;
      case 2:
        // Initiate "Search By Name" dialog
        session.beginDialog('/anthracnose');
        break;
      case 3:
        // Initiate "Search By Name" dialog
        session.beginDialog('/ringspot');
        break;
      case 4:
        // Initiate "Search By Name" dialog
        session.beginDialog('/diseaseid');
        break;
      }
    }
])

//=========================//
//fucntion to give info on pesticides
//=========================//
bot.dialog('/pesticides', [
  function (session, results) {
    builder.Prompts.choice(session, 'Which would you like information on?', ['Orthene', 'Confidol', 'Sunseed', 'Rabon', 'Rogor', 'Glyphosate'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        session.beginDialog('/orthene');
        break;
      case 1:
        // Initiate "Search By Name" dialog
        session.beginDialog('/confidol');
        break;
      case 2:
        // Initiate "Search By Name" dialog
        session.beginDialog('/sunseed');
        break;
      case 3:
        // Initiate "Search By Name" dialog
        session.beginDialog('/rabon');
        break;
      case 4:
        // Initiate "Search By Name" dialog
        session.beginDialog('/rogor');
        break;
      case 4:
        // Initiate "Search By Name" dialog
        session.beginDialog('/glyphosate');
        break;
      }
    }
])

//=========================//
//fucntion to identify a fertiliser intent
//=========================//
bot.dialog('/fertiliser', [
  function (session, results) {
    builder.Prompts.choice(session, 'Which would you like information on?', ['Thrips', 'White Fly', 'Bean Pod Borer', 'Corn Earworm', 'Cotton Bollworm', 'Cutworm', 'Aphids', 'Scale Insect', 'Help me identify a pest'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        session.beginDialog('/thrips');
        break;
      case 1:
        // Initiate "Search By Name" dialog
        session.beginDialog('/whitefly');
        break;
      case 2:
        // Initiate "Search By Name" dialog
        session.beginDialog('/beanpodborer');
        break;
      case 3:
        // Initiate "Search By Name" dialog
        session.beginDialog('/cornearworm');
        break;
      case 4:
        // Initiate "Search By Name" dialog
        session.beginDialog('/cottonbollworm');
        break;
      case 5:
        // Initiate "Search By Name" dialog
        session.beginDialog('/cutworm');
        break;
      case 6:
        // Initiate "Search By Time" dialog
        session.beginDialog('/aphids');
        break;
      case 7:
        // Initiate "Search By Time" dialog
        session.beginDialog('/scaleinsect');
        break;
      case 8:
        // Initiate "Search By Time" dialog
        session.beginDialog('/pestid');
        break;
      }
  }
])

//=========================//
//function to identify machinery
//=========================//
bot.dialog('/machinery', [
  function (session, results) {
    builder.Prompts.choice(session, 'Which would you like information on?', ['Tractors', 'Water Pumps', 'Seeders', 'Rotary Hoe', 'Harvester'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        session.beginDialog('/tractors');
        break;
      case 1:
        // Initiate "Search By Name" dialog
        session.beginDialog('/waterpumps');
        break;
      case 2:
        // Initiate "Search By Name" dialog
        session.beginDialog('/seeders');
        break;
      case 3:
        // Initiate "Search By Name" dialog
        session.beginDialog('/rotaryhoe');
        break;
      case 4:
        // Initiate "Search By Name" dialog
        session.beginDialog('/harvester');
        break;
      }
    }
])

//=========================//
//function to display weather info
//=========================//
bot.dialog('/weather', [
  function (session, results) {
    builder.Prompts.choice(session, 'Which would you like information on?', ['Weather for Today/Tomorrow', 'Weather for this Week', 'Weather for this month'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        session.beginDialog('/weathertoday');
        break;
      case 1:
        // Initiate "Search By Name" dialog
        session.beginDialog('/weatherweek');
        break;
      case 2:
        // Initiate "Search By Name" dialog
        session.beginDialog('/weathermonth');
        break;
      }
    }
])

//=========================//
//function to display soil info
//=========================//
bot.dialog('/market', [
  function (session, results) {
    builder.Prompts.choice(session, 'Which would you like information on?', ['Buying Seeds', 'Selling Seeds', 'Buying Equipment', 'Selling Equipment','Market Places for crops'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        session.beginDialog('/buyingseeds');
        break;
      case 1:
        // Initiate "Search By Day" dialog
        session.beginDialog('/sellingseeds');
        break;
      case 2:
        // Initiate "Search By Day" dialog
        session.beginDialog('/buyingequipment');
        break;
      case 3:
        // Initiate "Search By Day" dialog
        session.beginDialog('/sellingequipment');
        break;
      case 4:
        // Initiate "Search By Name" dialog
        session.beginDialog('/marketplacecrops');
        break;
      }
    }
])

//=========================//
//function to display soil info
//=========================//
bot.dialog('/soil', [
  function (session, results) {
    builder.Prompts.choice(session, 'Which would you like information on?', ['Soil PH', 'Soil Types', 'General Soil issues'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        session.beginDialog('/soilph');
        break;
      case 1:
        // Initiate "Search By Name" dialog
        session.beginDialog('/soiltype');
        break;
      case 2:
        // Initiate "Search By Name" dialog
        session.beginDialog('/soilissues');
        break;
      }
    }
])


// =========================================================
// Bots Dialogs to respond to specific queries
// =========================================================

//=========================//
//Greetings and general conversation
//=========================//
//help
bot.dialog('/help', [
    function (session) {
        builder.Prompts.text(session, 'This is the FarmEd Chatbot, ask a question about farming or alternitevely type \'main menu\' for a menu!');
    },
]);

//=========================//
//crops
//=========================//
bot.dialog('/okra', [
    function (session) {
        builder.Prompts.confirm(session, 'Would you like to know more about okra?');
    },
    function (session, results){
      if (results.response){
        session.send("Okra test information")
      }
      else{
        session.beginDialog('/mainmenu', results);
      }
    }
]);

bot.dialog('/pests', [
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
