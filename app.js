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
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/4f58e80f-cb48-41ce-95f2-4427c21d1db8?subscription-key=30dad33bb3e142bfa07000c49875a401&timezoneOffset=0&verbose=true&spellCheck=true';
var recognizer = new builder.LuisRecognizer(model);
var dialog = new builder.IntentDialog({recognizers: [recognizer]});
bot.dialog('/', dialog);

// =========================================================
// LUIS Dialogs
// =========================================================

// =========================================================
// Variables to be changed according to what the user wants
// =========================================================
var currentCrop = '';
var currentPest = '';
var currentDisease = '';
var currentPesticide = '';
var currentMachine = '';
var currentFertiliser = '';
var userName = '';

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
     userName = results.response;
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
    session.send('See you later ' + userName + '!')
  }
])

dialog.matches('mainmenu', [
  function (session, results) {
    session.beginDialog('/mainmenu', results)
  }
])

dialog.onDefault([
  function (session, results) {
    session.send('Sorry ' + userName + ' ...I did\'t understand that. Let me show you what I can do. Here is the Main Menu.')
    session.beginDialog('/mainmenu', results)
  }
])

//=========================//
//Crop Intents for General Information
//=========================//
dialog.matches('okra', [
  function (session, results) {
    currentCrop = 'Okra';
    session.beginDialog('cropGeneral', results)
  }
])

dialog.matches('pawpaw', [
  function (session, results) {
    currentCrop = 'Paw Paw';
    session.beginDialog('cropGeneral', results)
  }
])

dialog.matches('longbean', [
  function (session, results) {
    currentCrop = 'Long Bean';
    session.beginDialog('cropGeneral', results)
  }
])

dialog.matches('pumpkin', [
  function (session, results) {
    currentCrop = 'Pumpkin';
    session.beginDialog('cropGeneral', results)
  }
])

dialog.matches('cabbage', [
  function (session, results) {
    currentCrop = 'Cabbage (Chinese/English)';
    session.beginDialog('cropGeneral', results)
  }
])

dialog.matches('cucumber', [
  function (session, results) {
    currentCrop = 'Cucumber';
    session.beginDialog('cropGeneral', results)
  }
])

dialog.matches('chilli', [
  function (session, results) {
    currentCrop = 'Chilli';
    session.beginDialog('cropGeneral', results)
  }
])

dialog.matches('cowpeas', [
  function (session, results) {
    currentCrop = 'Cow Peas';
    session.beginDialog('cropGeneral', results)
  }
])

dialog.matches('tomato', [
  function (session, results) {
    currentCrop = 'Tomato';
    session.beginDialog('cropGeneral', results)
  }
])

dialog.matches('eggplant', [
  function (session, results) {
    currentCrop = 'Eggplant';
    session.beginDialog('cropGeneral', results)
  }
])

dialog.matches('cassava', [
  function (session, results) {
    currentCrop = 'Cassava';
    session.beginDialog('cropGeneral', results)
  }
])

dialog.matches('yams', [
  function (session, results) {
    currentCrop = 'Yams';
    session.beginDialog('cropGeneral', results)
  }
])

dialog.matches('tobacco', [
  function (session, results) {
    currentCrop = 'Tobacco';
    session.beginDialog('cropGeneral', results)
  }
])

//=========================//
//diseases intents
//=========================//
dialog.matches('nitrogendeficiency', [
  function (session, results) {
    currentDisease = "Nitrogen Deficiency"
    session.beginDialog('diseaseGeneral', results)
  }
])

dialog.matches('blackspot', [
  function (session, results) {
    currentDisease = "Black Spot"
    ssession.beginDialog('diseaseGeneral', results)
  }
])

dialog.matches('anthracnose', [
  function (session, results) {
    currentDisease = "Anthracnose"
    session.beginDialog('diseaseGeneral', results)
  }
])

dialog.matches('ringspot', [
  function (session, results) {
    currentDisease = "Ring Spot"
    session.beginDialog('diseaseGeneral', results)
  }
])

dialog.matches('powderymildew', [
  function (session, results) {
    currentDisease = "Powdery Mildew"
    session.beginDialog('diseaseGeneral', results)
  }
])

dialog.matches('sunscald', [
  function (session, results) {
    currentDisease = "Sunscald"
    session.beginDialog('pestanddiseaseidentifier', results)
  }
])

//=========================//
//pest intents
//=========================//
dialog.matches('thrips', [
  function (session, results) {
    currentPest = 'Thrips';
    session.beginDialog('pestGeneral', results)
  }
])

dialog.matches('whitefly', [
  function (session, results) {
    currentPest = 'Whitefly';
    session.beginDialog('pestGeneral', results)
  }
])

dialog.matches('beanpodborer', [
  function (session, results) {
    currentPest = 'Bean Pod Borer';
    session.beginDialog('pestGeneral', results)
  }
])

dialog.matches('cornearworm', [
  function (session, results) {
    currentPest = 'Corn Earworm';
    session.beginDialog('pestGeneral', results)
  }
])

dialog.matches('cottonbollworm', [
  function (session, results) {
    currentPest = 'Cotton Bollworm';
    session.beginDialog('pestGeneral', results)
  }
])

dialog.matches('cutworm', [
  function (session, results) {
    currentPest = 'Cutworm';
    session.beginDialog('pestGeneral', results)
  }
])

dialog.matches('aphids', [
  function (session, results) {
    currentPest = 'Aphids';
    session.beginDialog('pestGeneral', results)
  }
])

dialog.matches('scaleinsect', [
  function (session, results) {
    currentPest = 'Scale Insect';
    session.beginDialog('pestGeneral', results)
  }
])

dialog.matches('pestanddiseaseidentifier', [
  function (session, results) {
    currentPest = 'Thrips';
    session.beginDialog('pestAndDiseaseIdentifier', results)
  }
])


//=========================//
//intents for pesticides
//=========================//
dialog.matches('orthene', [
  function (session, results) {
    currentPesticide = 'Orthene';
    session.beginDialog('pesticideGeneral', results)
  }
])

dialog.matches('confidol', [
  function (session, results) {
    currentPesticide = 'Confidol';
    session.beginDialog('pesticideGeneral', results)
  }
])

dialog.matches('multiguard', [
  function (session, results) {
    currentPesticide = 'MultiGuard';
    session.beginDialog('pesticideGeneral', results)
  }
])

dialog.matches('sunseed', [
  function (session, results) {
    currentPesticide = 'Sunseed';
    session.beginDialog('pesticideGeneral', results)
  }
])

dialog.matches('rabon', [
  function (session, results) {
    currentPesticide = 'Rabon';
    session.beginDialog('pesticideGeneral', results)
  }
])

dialog.matches('rogor', [
  function (session, results) {
    currentPesticide = 'Rogor';
    session.beginDialog('pesticideGeneral', results)
  }
])

dialog.matches('glyphosate', [
  function (session, results) {
    currentPesticide = 'Glyphosphate';
    session.beginDialog('pesticideGeneral', results)
  }
])

//=========================//
//intents for fertilisers
//=========================//
dialog.matches('hydrocomplex', [
  function (session, results) {
    currentFertiliser = 'Hydrocomplex';
    session.beginDialog('fertiliserGeneral', results)
  }
])

dialog.matches('urea', [
  function (session, results) {
    currentFertiliser = 'Urea';
    session.beginDialog('fertiliserGeneral', results)
  }
])

dialog.matches('npk', [
  function (session, results) {
    currentFertiliser = 'NPK';
    session.beginDialog('fertiliserGeneral', results)
  }
])

dialog.matches('borex', [
  function (session, results) {
    currentFertiliser = 'Borex';
    session.beginDialog('fertiliserGeneral', results)
  }
])

dialog.matches('manure', [
  function (session, results) {
    currentFertiliser = 'Manure';
    session.beginDialog('fertiliserGeneral', results)
  }
])

//=========================//
//function to identify machinery
//=========================//
dialog.matches('tractor', [
  function (session, results) {
    currentMachine = 'Tractor';
    session.beginDialog('machineryGeneral', results)
  }
])

dialog.matches('waterpump', [
  function (session, results) {
    currentMachine = 'Waterpump';
    session.beginDialog('machineryGeneral', results)
  }
])

dialog.matches('seeder', [
  function (session, results) {
    currentMachine = 'Seeder';
    session.beginDialog('machineryGeneral', results)
  }
])

dialog.matches('rotaryhoe', [
  function (session, results) {
    currentMachine = 'Rotary Hoe';
    session.beginDialog('machineryGeneral', results)
  }
])

dialog.matches('discplough', [
  function (session, results) {
    currentMachine = 'Discplough';
    session.beginDialog('machineryGeneral', results)
  }
])

dialog.matches('harvester', [
  function (session, results) {
    currentMachine = 'Harvester';
    session.beginDialog('machineryGeneral', results)
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
        currentCrop = 'Okra';
        session.beginDialog('cropGeneral');
        break;
      case 1:
        // Initiate "Search By Name" dialog
        currentCrop = 'Eggplant';
        session.beginDialog('cropGeneral');
        break;
      case 2:
        // Initiate "Search By Name" dialog
        currentCrop = 'Long Bean';
        session.beginDialog('cropGeneral');
        break;
      case 3:
        // Initiate "Search By Name" dialog
        currentCrop = 'Pumpkin';
        session.beginDialog('cropGeneral');
        break;
      case 4:
        // Initiate "Search By Name" dialog
        currentCrop = 'Cabbage';
        session.beginDialog('cropGeneral');
        break;
      case 5:
        // Initiate "Search By Name" dialog
        currentCrop = 'Chilli';
        session.beginDialog('cropGeneral');
        break;
      case 6:
        // Initiate "Search By Time" dialog
        currentCrop = 'Paw Paw';
        session.beginDialog('cropGeneral');
        break;
      case 7:
        // Initiate "Search By Time" dialog
        currentCrop = 'Tomato';
        session.beginDialog('cropGeneral');
        break;
      case 8:
        // Initiate "Search By Time" dialog
        currentCrop = 'Cucumber';
        session.beginDialog('cropGeneral');
        break;
      case 9:
        // Initiate "Search By Time" dialog
        currentCrop = 'Cow Peas';
        session.beginDialog('cropGeneral');
        break;
      case 10:
        // Initiate "Search By Time" dialog
        currentCrop = 'Cassava';
        session.beginDialog('cropGeneral');
        break;
      case 11:
        // Initiate "Search By Time" dialog
        currentCrop = 'Yams';
        session.beginDialog('cropGeneral');
        break;
      case 12:
        // Initiate "Search By Time" dialog
        currentCrop = 'Tobacco';
        session.beginDialog('cropGeneral');
        break;
    }
  }
])

//=========================//
//function to identiy pest intent from the main menu
//=========================//
bot.dialog('/pest', [
  function (session, results) {
    builder.Prompts.choice(session, 'Which would you like information on?', ['Help me identify a pest','Thrips', 'White Fly', 'Bean Pod Borer', 'Corn Earworm', 'Cotton Bollworm', 'Cutworm', 'Aphids', 'Scale Insect', 'Flea Beetle'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        session.beginDialog('pestAndDiseaseIdentifier');
        break;
      case 1:
        // Initiate "Search By Day" dialog
        currentPest = 'Thrips';
        session.beginDialog('pestGeneral');
        break;
      case 2:
        // Initiate "Search By Name" dialog
        currentPest = 'Whitefly';
        session.beginDialog('pestGeneral');
        break;
      case 3:
        // Initiate "Search By Name" dialog
        currentPest = 'Bean Pod Borer';
        session.beginDialog('pestGeneral');
        break;
      case 4:
        // Initiate "Search By Name" dialog
        currentPest = 'Corn Earworm';
        session.beginDialog('pestGeneral');
        break;
      case 5:
        // Initiate "Search By Name" dialog
        currentPest = 'Cotton Bollworm';
        session.beginDialog('pestGeneral');
        break;
      case 6:
        // Initiate "Search By Name" dialog
        currentPest = 'Cutworm';
        session.beginDialog('pestGeneral');
        break;
      case 7:
        // Initiate "Search By Time" dialog
        currentPest = 'Aphids';
        session.beginDialog('pestGeneral');
        break;
      case 8:
        // Initiate "Search By Time" dialog
        currentPest = 'Scale Insect';
        session.beginDialog('pestGeneral');
        break;
      case 9:
        // Initiate "Search By Time" dialog
        currentPest = 'Flea Beetle';
        session.beginDialog('pestanddiseaseidentifier');
        break;
      }
  }
])

//=========================//
// function to identity a disease intent from the main menu
//=========================//
bot.dialog('/diseases', [
  function (session, results) {
    builder.Prompts.choice(session, 'Which would you like information on?', ['Help me Identify a disease','Nitrogen Deficiency', 'Black Spot', 'Anthracnose', 'Ring Spot', 'Powdery Mildew', 'Black Mould', 'Early Blight', 'Sunscald'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        session.beginDialog('pestAndDiseaseIdentifier');
        break;
      case 1:
        // Initiate "Search By Day" dialog
        currentDisease = "Nitrogen Deficiency";
        session.beginDialog('diseaseGeneral');
        break;
      case 2:
        // Initiate "Search By Name" dialog
        currentDisease = "Black Spot";
        session.beginDialog('diseaseGeneral');
        break;
      case 3:
        // Initiate "Search By Name" dialog
        currentDisease = "Anthracnose";
        session.beginDialog('diseaseGeneral');
        break;
      case 4:
        // Initiate "Search By Name" dialog
        currentDisease = "Ring Spot";
        session.beginDialog('diseaseGeneral');
        break;
      case 4:
        // Initiate "Search By Name" dialog
        currentDisease = "Powdery Mildew";
        session.beginDialog('diseaseGeneral');
        break;
      case 5:
        // Initiate "Search By Name" dialog
        currentDisease = "Black Mould";
        session.beginDialog('diseaseGeneral');
        break;
      case 6:
        // Initiate "Search By Name" dialog
        currentDisease = "Early Blight";
        session.beginDialog('diseaseGeneral');
        break;
      case 7:
        // Initiate "Search By Name" dialog
        currentDisease = "Sunscald";
        session.beginDialog('diseaseGeneral');
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
        currentPesticide = "Orthene";
        session.beginDialog('pesticideGeneral');
        break;
      case 1:
        // Initiate "Search By Name" dialog
        currentPesticide = "Confidol";
        session.beginDialog('pesticideGeneral');
        break;
      case 2:
        // Initiate "Search By Name" dialog
        currentPesticide = "Sunseed";
        session.beginDialog('pesticideGeneral');
        break;
      case 3:
        // Initiate "Search By Name" dialog
        currentPesticide = "Rabon";
        session.beginDialog('pesticideGeneral');
        break;
      case 4:
        // Initiate "Search By Name" dialog
        currentPesticide = "Rogor";
        session.beginDialog('pesticideGeneral');
        break;
      case 4:
        // Initiate "Search By Name" dialog
        currentPesticide = "Glyphosate";
        session.beginDialog('pesticideGeneral');
        break;
      }
    }
])

//=========================//
//function to identify fertiliser
//=========================//
bot.dialog('/fertiliser', [
  function (session, results) {
    builder.Prompts.choice(session, 'Which would you like information on?', ['Hydrocomplex', 'Urea', 'NPK', 'Borex', 'Manure'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        currentFertiliser = 'Hydrocomplex';
        session.beginDialog('fertiliserGeneral');
        break;
      case 1:
        // Initiate "Search By Name" dialog
        currentFertiliser = 'Urea';
        session.beginDialog('fertiliserGeneral');
        break;
      case 2:
        // Initiate "Search By Name" dialog
        currentFertiliser = 'NPK';
        session.beginDialog('fertiliserGeneral');
        break;
      case 3:
        // Initiate "Search By Name" dialog
        currentFertiliser = 'Borex';
        session.beginDialog('fertiliserGeneral');
        break;
      case 4:
        // Initiate "Search By Name" dialog
        currentFertiliser = 'Manure';
        session.beginDialog('fertiliserGeneral');
        break;
      }
    }
])

//=========================//
//fucntion to identify a machinery intent
//=========================//
bot.dialog('/machinery', [
  function (session, results) {
    builder.Prompts.choice(session, 'Which would you like information on?', ['Tractor', 'Water Pump', 'Seeder', 'Rotary Hoe', 'Discplough', 'Harvester'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        currentMachine = 'Tractor';
        session.beginDialog('machineryGeneral');
        break;
      case 1:
        // Initiate "Search By Name" dialog
        currentMachine = 'Waterpump';
        session.beginDialog('machineryGeneral');
        break;
      case 2:
        // Initiate "Search By Name" dialog
        currentMachine = 'Seeder';
        session.beginDialog('machineryGeneral');
        break;
      case 3:
        // Initiate "Search By Name" dialog
        currentMachine = 'Rotary Hoe';
        session.beginDialog('machineryGeneral');
        break;
      case 4:
        // Initiate "Search By Name" dialog
        currentMachine = 'Discplough';
        session.beginDialog('machineryGeneral');
        break;
      case 5:
        // Initiate "Search By Name" dialog
        currentMachine = 'Harvester';
        session.beginDialog('machineryGeneral');
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
//information to respond
//=========================//

//crops
//general information for crops
var cropGeneralInformationArray = {};
cropGeneralInformationArray['Okra'] = 'this is the general information test croptest' + currentCrop;
cropGeneralInformationArray['Paw Paw'] = 'this is the general information test croptest' + currentCrop;
cropGeneralInformationArray['Long Bean'] = 'this is the general information test croptest' + currentCrop;
cropGeneralInformationArray['Pumpkin'] = 'this is the general information test croptest' + currentCrop;
cropGeneralInformationArray['Cabbage'] = 'this is the general information test croptest' + currentCrop;
cropGeneralInformationArray['Cucumber'] = 'this is the general information test croptest' + currentCrop;
cropGeneralInformationArray['Chilli'] = 'this is the general information test croptest' + currentCrop;
cropGeneralInformationArray['Cow Peas'] = 'this is the general information test croptest' + currentCrop;
cropGeneralInformationArray['Tomato'] = 'this is the general information test croptest' + currentCrop;
cropGeneralInformationArray['Eggplant'] = 'this is the general information test croptest' + currentCrop;
cropGeneralInformationArray['Cassava'] = 'this is the general information test croptest' + currentCrop;
cropGeneralInformationArray['Yams'] = 'this is the general information test croptest' + currentCrop;
cropGeneralInformationArray['Tobacco'] = 'this is the general information test croptest' + currentCrop;

//pest/Disease info croptestcrops
var cropPestDiseaseInformationArray = {};
cropPestDiseaseInformationArray['Okra'] = 'this is the pest/disease information test croptest' + currentCrop;
cropPestDiseaseInformationArray['Paw Paw'] = 'this is the pest/disease information test croptest' + currentCrop;
cropPestDiseaseInformationArray['Long Bean'] = 'this is the pest/disease information test croptest' + currentCrop + '!';
cropPestDiseaseInformationArray['Pumpkin'] = 'this is the pest/disease information test croptest' + currentCrop;
cropPestDiseaseInformationArray['Cabbage'] = 'this is the pest/disease information test croptest' + currentCrop;
cropPestDiseaseInformationArray['Cucumber'] = 'this is the pest/disease information test croptest' + currentCrop;
cropPestDiseaseInformationArray['Chilli'] = 'this is the pest/disease information test croptest' + currentCrop;
cropPestDiseaseInformationArray['Cow Peas'] = 'this is the pest/disease information test croptest' + currentCrop;
cropPestDiseaseInformationArray['Tomato'] = 'this is the pest/disease information test croptest' + currentCrop;
cropPestDiseaseInformationArray['Eggplant'] = 'this is the pest/disease information test croptest' + currentCrop;
cropPestDiseaseInformationArray['Cassava'] = 'this is the pest/disease information test croptest' + currentCrop;
cropPestDiseaseInformationArray['Yams'] = 'this is the pest/disease information test croptest' + currentCrop;
cropPestDiseaseInformationArray['Tobacco'] = 'this is the pest/disease information test croptest' + currentCrop;

//market info croptestcrops
var cropMarketInformationArray = {};
cropMarketInformationArray['Okra'] = 'this is the market information test croptest' + currentCrop;
cropMarketInformationArray['Paw Paw'] = 'this is the market information test croptest' + currentCrop;
cropMarketInformationArray['Long Bean'] = 'this is the market information test croptest' + currentCrop;
cropMarketInformationArray['Pumpkin'] = 'this is the market information test croptest' + currentCrop;
cropMarketInformationArray['Cabbage'] = 'this is the market information test croptest' + currentCrop;
cropMarketInformationArray['Cucumber'] = 'this is the market information test croptest' + currentCrop;
cropMarketInformationArray['Chilli'] = 'this is the market information test croptest' + currentCrop;
cropMarketInformationArray['Cow Peas'] = 'this is the market information test croptest' + currentCrop;
cropMarketInformationArray['Tomato'] = 'this is the market information test croptest' + currentCrop;
cropMarketInformationArray['Eggplant'] = 'this is the market information test croptest' + currentCrop;
cropMarketInformationArray['Cassava'] = 'this is the market information test croptest' + currentCrop;
cropMarketInformationArray['Yams'] = 'this is the market information test croptest' + currentCrop;
cropMarketInformationArray['Tobacco'] = 'this is the market information test croptest' + currentCrop;

//planting guide info croptestcrops
var cropPlantingGuideInformationArray = {};
cropPlantingGuideInformationArray['Okra'] = 'this is the planting guide information test croptest' + currentCrop;
cropPlantingGuideInformationArray['Paw Paw'] = 'this is the planting guide information test croptest' + currentCrop;
cropPlantingGuideInformationArray['Long Bean'] = 'this is the planting guide information test croptest' + currentCrop;
cropPlantingGuideInformationArray['Pumpkin'] = 'this is the planting guide information test croptest' + currentCrop;
cropPlantingGuideInformationArray['Cabbage'] = 'this is the planting guide information test croptest' + currentCrop;
cropPlantingGuideInformationArray['Cucumber'] = 'this is the planting guide information test croptest' + currentCrop;
cropPlantingGuideInformationArray['Chilli'] = 'this is the planting guide information test croptest' + currentCrop;
cropPlantingGuideInformationArray['Cow Peas'] = 'this is the planting guide information test croptest' + currentCrop;
cropPlantingGuideInformationArray['Tomato'] = 'this is the planting guide information test croptest' + currentCrop;
cropPlantingGuideInformationArray['Eggplant'] = 'this is the planting guide information test croptest' + currentCrop;
cropPlantingGuideInformationArray['Cassava'] = 'this is the planting guide information test croptest' + currentCrop;
cropPlantingGuideInformationArray['Yams'] = 'this is the planting guide information test croptest' + currentCrop;
cropPlantingGuideInformationArray['Tobacco'] = 'this is the planting guide information test croptest' + currentCrop;

//information for diseases
//symptoms info for diseases
var diseaseSymptomsArray = {};
diseaseSymptomsArray['Nitrogen Deficiency'] = 'this is the symptoms information test for ' + currentCrop;
diseaseSymptomsArray['Black Spot'] = 'this is the symptoms information test for ' + currentCrop;
diseaseSymptomsArray['Stalk Rot'] = 'this is the symptoms information test for ' + currentCrop;
diseaseSymptomsArray['Anthracnose'] = 'this is the symptoms information test for ' + currentCrop;
diseaseSymptomsArray['Ring Spot'] = 'this is the symptoms information test for ' + currentCrop;
diseaseSymptomsArray['Powdery Mildew'] = '\n-Fine white powder coating on leaves \n-Leaves roll upwards and dry out';
diseaseSymptomsArray['Black Mould'] = '\n-Sooty to dark oily mould on underside and upper side of leaves.\
\n-Infected leaves roll, wilt and fall to the ground';
diseaseSymptomsArray['Early Blight'] = 'Circular leaf spots up to more than 1cm wide';
diseaseSymptomsArray['Sunscald'] = 'White, sunken area of fruit that becomes paper-like and can turn into a wrinkled black/brown hole';

//pest/Disease info for crops
var diseaseTreatmentsArray = {};
diseaseTreatmentsArray['Nitrogen Deficiency'] = 'this is the treatments information test for ' + currentCrop;
diseaseTreatmentsArray['Black Spot'] = 'this is the treatments information test for ' + currentCrop;
diseaseTreatmentsArray['Stalk Rot'] = 'this is the treatments information test for ' + currentCrop;
diseaseTreatmentsArray['Anthracnose'] = 'this is the treatments information test for ' + currentCrop + '!';
diseaseTreatmentsArray['Ring Spot'] = 'this is the treatments information test for ' + currentCrop;
diseaseTreatmentsArray['Powdery Mildew'] = '\n-Apply wettable sulphur products or chlorothalonil in early morning or evening. Spray every two weeks\
\n-Use products containing horticultural oil or potassium bicarbonate \
\n-Where the number of plants is small, use: normal strength milk diluted 1 part in 10 parts of water.';
diseaseTreatmentsArray['Black Mould'] ='\n-Use copper Sprays';
diseaseTreatmentsArray['Early Blight'] = '\n-Spray with copper compounds e.g. copper hydroxide';
diseaseTreatmentsArray['Sunscald'] = 'Use a hose with a strong jet of water to remove thrips from the plants.\
After harvest, destroy crop remains \
Spray plant-derived pesticides such as derris, chilli, garlic, onion and papaya on underside of leaves\
Spray white oil or soap solution on underside of leaves. A second application may be necessary after 3-4 weeks.\
How to make white oil/soap solution:\
White oil:\
3 tablespoons (1/3 cup) cooking oil in 4 litres water.\
½ teaspoon detergent soap.\
Shake well and use.\
Soap:\
Use soap (pure soap, not detergent).\
5 tablespoons of soap in 4 litres water, disease'


//market info for crops
var diseaseCommonCropsInformationArray = {};
diseaseCommonCropsInformationArray['Nitrogen Deficiency'] = 'this is the commoncrops test for ' + currentCrop;
diseaseCommonCropsInformationArray['Black Spot'] = 'this is the commoncrops test for ' + currentCrop;
diseaseCommonCropsInformationArray['Stalk Rot'] = 'this is the commoncrops test for ' + currentCrop;
diseaseCommonCropsInformationArray['Anthracnose'] = 'this is the commoncrops test for ' + currentCrop;
diseaseCommonCropsInformationArray['Ring Spot'] = 'this is the commoncrops test for ' + currentCrop;
diseaseCommonCropsInformationArray['Powdery Mildew'] = 'Okra';
diseaseCommonCropsInformationArray['Black Mould'] = 'Okra';
diseaseCommonCropsInformationArray['Early Blight'] = 'this is the symptoms information test for ' + currentCrop;
diseaseCommonCropsInformationArray['Sunscald'] = 'this is the symptoms information test for ' + currentCrop;

//planting guide info for crops
var diseasePreventionInformationArray = {};
diseasePreventionInformationArray['Nitrogen Deficiency'] = 'this is the prevention information test for ' + currentCrop;
diseasePreventionInformationArray['Black Spot'] = 'this is the prevention information test for ' + currentCrop;
diseasePreventionInformationArray['Stalk Rot'] = 'this is the prevention information test for ' + currentCrop;
diseasePreventionInformationArray['Anthracnose'] = 'this is the prevention information test for ' + currentCrop;
diseasePreventionInformationArray['Ring Spot'] = 'this is the prevention information test for ' + currentCrop;
diseasePreventionInformationArray['Powdery Mildew'] = '\n-Plant in sunny places and choose areas with good air circulation \n-Rotate crops \n- Do not plant new crops next to those that have the disease';
diseasePreventionInformationArray['Black Mould'] = '\n-Avoid overlap of okra in the same field\
\n-Rotate with baby corn, maize, small grains or pulses\
\n-Avoid overhead irrigation';
diseasePreventionInformationArray['Early Blight'] = '\n-Use clean certified seeds that are not taken from plants that were previously infected.\
\n-Burn crop debris/infected material after harvest,  Remove  weeds as they may serve as alternate hosts. \
\n-Fields should not be planted with tomato or eggplant. Also avoid planting new plots of these vegetables alongside old ones .Rotate with corn or legumes.';
diseasePreventionInformationArray['Sunscald'] = '\n-Once a week, check for pests/ diseases that destroy leaves which protect the fruit from sun\
\n-Support plants using stakes, string or wire to reduce damage to leaves from wind';


//information for pests
//symptoms info for pests
var pestSymptomsArray = {};
pestSymptomsArray['Thrips'] = 'Speckled areas/black spots on leaves, Silvered appearance of older leaves,\
Small insects on the underside of young leaves\
Scarring on fruits';

pestSymptomsArray['Whitefly'] = 'this is the symptoms information test for ' + currentCrop;
pestSymptomsArray['Bean Pod Borer'] = 'this is the symptoms information test for ' + currentCrop;
pestSymptomsArray['Corn Earworm'] = 'this is the symptoms information test for ' + currentCrop;
pestSymptomsArray['Cotton Bollworm'] = 'this is the symptoms information test for ' + currentCrop;
pestSymptomsArray['Cutworm'] = 'this is the symptoms information test for ' + currentCrop;
pestSymptomsArray['Aphids'] = 'this is the symptoms information test for ' + currentCrop;
pestSymptomsArray['Scale Insect'] = 'this is the symptoms information test for ' + currentCrop;
pestSymptomsArray['Flea Beetle'] = '\n-Many small holes on leaves (1-5mm in size)\
\n-Circular leaf spots up to more than 1cm wide';




//pest/Disease info for crops
var pestTreatmentsArray = {};
pestTreatmentsArray['Thrips'] = 'this is the treatments information test for ' + currentCrop;
pestTreatmentsArray['Whitefly'] = 'this is the treatments information test for ' + currentCrop;
pestTreatmentsArray['Bean Pod Borer'] = 'this is the treatments information test for ' + currentCrop + '!';
pestTreatmentsArray['Corn Earworm'] = 'this is the treatments information test for ' + currentCrop;
pestTreatmentsArray['Cotton Bollworm'] = 'this is the treatments information test for ' + currentCrop;
pestTreatmentsArray['Cutworm'] = 'this is the treatments information test for ' + currentCrop;
pestTreatmentsArray['Aphids'] = 'this is the treatments information test for ' + currentCrop;
pestTreatmentsArray['Scale Insect'] = 'this is the treatments information test for ' + currentCrop;
pestTreatmentsArray['Flea Beetle'] = '\n-After harvest, collect and burn or bury as much of the crop as possible.\
\n-Spray plant-derived products, such as derris or chilli (with the addition of soap)';



//market info for crops
var pestCommonCropsInformationArray = {};
pestCommonCropsInformationArray['Thrips'] = 'this is the commoncrops test for ' + currentCrop;
pestCommonCropsInformationArray['Whitefly'] = 'this is the commoncrops test for ' + currentCrop;
pestCommonCropsInformationArray['Bean Pod Borer'] = 'this is the commoncrops test for ' + currentCrop;
pestCommonCropsInformationArray['Corn Earworm'] = 'this is the commoncrops test for ' + currentCrop;
pestCommonCropsInformationArray['Cotton Bollworm'] = 'this is the commoncrops test for ' + currentCrop;
pestCommonCropsInformationArray['Cutworm'] = 'this is the commoncrops test for ' + currentCrop;
pestCommonCropsInformationArray['Aphids'] = 'this is the commoncrops test for ' + currentCrop;
pestCommonCropsInformationArray['Scale Insect'] = 'Okra'
pestCommonCropsInformationArray['Flea Beetle'] = 'Okra';

//prevention info for crops
var pestPreventionInformationArray = {};
pestPreventionInformationArray['Thrips'] = 'this is the prevention information test for ' + currentCrop;
pestPreventionInformationArray['Whitefly'] = 'this is the prevention information test for ' + currentCrop;
pestPreventionInformationArray['Bean Pod Borer'] = 'this is the prevention information test for ' + currentCrop;
pestPreventionInformationArray['Corn Earworm'] = 'this is the prevention information test for ' + currentCrop;
pestPreventionInformationArray['Cotton Bollworm'] = 'this is the prevention information test for ' + currentCrop;
pestPreventionInformationArray['Cutworm'] = 'this is the prevention information test for ' + currentCrop;
pestPreventionInformationArray['Aphids'] = 'this is the prevention information test for ' + currentCrop;
pestPreventionInformationArray['Scale Insect'] = 'this is the prevention information test for ' + currentCrop;
pestPreventionInformationArray['Flea Beetle'] = 'Grow non-thrip attacked plants within the crop. For example, grow peppers between yard long beans.\
Destroy weeds within and around crops to prevent build up of thrips';






//pesticides inforamtion
//usage info
var pesticideUsageInfoArray = {};
pesticideUsageInfoArray['Orthene'] = 'this is the usage information test for ' + currentCrop;
pesticideUsageInfoArray['Confidol'] = 'this is the usage information test for ' + currentCrop;
pesticideUsageInfoArray['MultiGuard'] = 'this is the usage information test for ' + currentCrop + '!';
pesticideUsageInfoArray['Sunseed'] = 'this is the usage information test for ' + currentCrop;
pesticideUsageInfoArray['Rabon'] = 'this is the usage information test for ' + currentCrop;
pesticideUsageInfoArray['Rogor'] = 'this is the usage information test for ' + currentCrop;
pesticideUsageInfoArray['Glyphosate'] = 'this is the usage information test for ' + currentCrop;

//market info for crops
var pesticideWhereToBuyInfoArray = {};
pesticideWhereToBuyInfoArray['Orthene'] = 'this is the wheretobuy test for ' + currentCrop;
pesticideWhereToBuyInfoArray['Confidol'] = 'this is the wheretobuy test for ' + currentCrop;
pesticideWhereToBuyInfoArray['MultiGuard'] = 'this is the wheretobuy test for ' + currentCrop;
pesticideWhereToBuyInfoArray['Sunseed'] = 'this is the wheretobuy test for ' + currentCrop;
pesticideWhereToBuyInfoArray['Rabon'] = 'this is the wheretobuy test for ' + currentCrop;
pesticideWhereToBuyInfoArray['Rogor'] = 'this is the wheretobuy test for ' + currentCrop;
pesticideWhereToBuyInfoArray['Glyphosate'] = 'this is the wheretobuy test for ' + currentCrop;

//costs info for crops
var pesticideCostsInfoArray = {};
pesticideCostsInfoArray['Orthene'] = 'this is the costs information test for ' + currentCrop;
pesticideCostsInfoArray['Confidol'] = 'this is the costs information test for ' + currentCrop;
pesticideCostsInfoArray['MultiGuard'] = 'this is the costs information test for ' + currentCrop;
pesticideCostsInfoArray['Sunseed'] = 'this is the costs information test for ' + currentCrop;
pesticideCostsInfoArray['Rabon'] = 'this is the costs information test for ' + currentCrop;
pesticideCostsInfoArray['Rabon'] = 'this is the costs information test for ' + currentCrop;
pesticideCostsInfoArray['Rogor'] = 'this is the planting guide information test for ' + currentCrop;

//fertilisers inforamtion
//usage info
var fertiliserUsageInfoArray = {};
fertiliserUsageInfoArray['Hydrocomplex'] = 'this is the usage information test for ' + currentCrop;
fertiliserUsageInfoArray['Urea'] = 'this is the usage information test for ' + currentCrop;
fertiliserUsageInfoArray['NPK'] = 'this is the usage information test for ' + currentCrop + '!';
fertiliserUsageInfoArray['Borex'] = 'this is the usage information test for ' + currentCrop;
fertiliserUsageInfoArray['Manure'] = 'this is the usage information test for ' + currentCrop;


//market info for crops
var fertiliserWhereToBuyArray = {};
fertiliserWhereToBuyArray['Hydrocomplex'] = 'this is the wheretobuy information test for ' + currentCrop;
fertiliserWhereToBuyArray['Urea'] = 'this is the wheretobuy information test for ' + currentCrop;
fertiliserWhereToBuyArray['NPK'] = 'this is the wheretobuy information test for ' + currentCrop + '!';
fertiliserWhereToBuyArray['Borex'] = 'this is the wheretobuy information test for ' + currentCrop;
fertiliserWhereToBuyArray['Manure'] = 'this is the wheretobuy information test for ' + currentCrop;

//planting guide info for crops
var fertiliserCostsArray = {};
fertiliserCostsArray['Hydrocomplex'] = 'this is the costs information test for ' + currentCrop;
fertiliserCostsArray['Urea'] = 'this is the costs information test for ' + currentCrop;
fertiliserCostsArray['NPK'] = 'this is the costs information test for ' + currentCrop + '!';
fertiliserCostsArray['Borex'] = 'this is the costs information test for ' + currentCrop;
fertiliserCostsArray['Manure'] = 'this is the costs information test for ' + currentCrop;

//machinery
//machinery usage
var machineryUsageInfoArray = {};
machineryUsageInfoArray['Tractor'] = 'this is the usage information test for ' + currentCrop;
machineryUsageInfoArray['Waterpump'] = 'this is the usage information test for ' + currentCrop;
machineryUsageInfoArray['Seeder'] = 'this is the usage information test for ' + currentCrop + '!';
machineryUsageInfoArray['Rotary Hoe'] = 'this is the usage information test for ' + currentCrop;
machineryUsageInfoArray['Discplough'] = 'this is the usage information test for ' + currentCrop;
machineryUsageInfoArray['Harvester'] = 'this is the usage information test for ' + currentCrop;


//market info for crops
var machineryWhereToBuyInfoArray = {};
machineryWhereToBuyInfoArray['Tractor'] = 'this is the wheretobuy test for ' + currentCrop;
machineryWhereToBuyInfoArray['Waterpump'] = 'this is the wheretobuy test for ' + currentCrop;
machineryWhereToBuyInfoArray['Seeder'] = 'this is the wheretobuy test for ' + currentCrop;
machineryWhereToBuyInfoArray['Rotary Hoe'] = 'this is the wheretobuy test for ' + currentCrop;
machineryWhereToBuyInfoArray['Discplough'] = 'this is the wheretobuy test for ' + currentCrop;
machineryWhereToBuyInfoArray['Harvester'] = 'this is the wheretobuy test for ' + currentCrop;


//planting guide info for crops
var machineryCostsInfoArray = {};
machineryCostsInfoArray['Tractor'] = 'this is the costs information test for ' + currentCrop;
machineryCostsInfoArray['Waterpump'] = 'this is the costs information test for ' + currentCrop;
machineryCostsInfoArray['Seeder'] = 'this is the costs information test for ' + currentCrop;
machineryCostsInfoArray['Rotary Hoe'] = 'this is the costs information test for ' + currentCrop;
machineryCostsInfoArray['Discplough'] = 'this is the costs information test for ' + currentCrop;
machineryCostsInfoArray['Harvester'] = 'this is the costs information test for ' + currentCrop;


//=========================//
//Greetings and general conversation
//=========================//
//help
bot.dialog('/help', [
    function (session) {
        builder.Prompts.text(session, 'Hi ' + userName + 'this is the FarmEd Chatbot, ask a question about farming or alternitevely type \'main menu\' for a menu!');
    },
]);

//=========================//
//crops
//=========================//
bot.dialog('cropGeneral', [
    function (session) {
        builder.Prompts.confirm(session, 'Would you like to know more about ' + currentCrop + ' ?');
    },
    function (session, results){
      if (results.response){
        session.beginDialog('cropInfoGeneral');
        }
      else{
        session.beginDialog('/mainmenu', results);
      }
    }
]);

bot.dialog('cropInfoGeneral', [
  function(session, results) {
      builder.Prompts.choice(session, 'What would you like to know about ' + currentCrop + '?', ['General Information', 'Pest/Disease Info', 'Market Info', 'Planting Guide']);
    },
    function (session, results) {
      switch (results.response.index) {
        case 0:
          // Initiate "Search By Day" dialog
          session.send(cropGeneralInformationArray[currentCrop]);
          break;
          case 1:
          // Initiate "Search By Name" dialog
          session.send(cropPestDiseaseInformationArray[currentCrop]);
          break;
          case 2:
          // Initiate "Search By Name" dialog
          session.send(cropMarketInformationArray[currentCrop]);
          break;
          case 3:
          // Initiate "Search By Name" dialog
          session.send(cropPlantingGuideInformationArray[currentCrop]);
          break;
        }
      }
])


//=========================//
//diseases
//=========================//
bot.dialog('diseaseGeneral', [
    function (session) {
      session.send({
        text: 'This is what ' + currentDisease +' looks like.',
        attachments: [
            {
                contentType: 'image/jpeg',
                contentUrl:'http://www.healthline.com/hlcmsresource/images/topic_centers/Diabetes/642x361_Is_Okra_the_Secret_Weapon_Against_Diabetes.jpg',
                name: 'okra'
            }
        ]});
        builder.Prompts.confirm(session, 'Would you like to know more about ' + currentDisease + '?');
    },
    function (session, results){
      if (results.response){
        session.beginDialog('diseaseInfoGeneral');
        }
      else{
        session.beginDialog('/mainmenu', results);
      }
    }
]);

bot.dialog('diseaseInfoGeneral', [
  function(session, results) {
      builder.Prompts.choice(session, 'What would you like to know about ' + currentDisease + '?' , ['Symptoms', 'Treatments', 'Common Crops', 'Prevention']);
    },
    function (session, results) {
      switch (results.response.index) {
        case 0:
          // Initiate "Search By Day" dialog
          session.send(diseaseSymptomsArray[currentDisease]);
          break;
          case 1:
          // Initiate "Search By Name" dialog
          session.send(diseaseTreatmentsArray[currentDisease]);
          break;
          case 2:
          // Initiate "Search By Name" dialog
          session.send(diseaseCommonCropsInformationArray[currentDisease]);
          break;
          case 3:
          // Initiate "Search By Name" dialog
          session.send(diseasePreventionInformationArray[currentDisease]);
          break;
        }
      }
])

bot.dialog('diseaseInfoIdentifier', [
  function(session, results) {
      builder.Prompts.choice(session, 'It seems you could potentially have ' + currentDisease + '. What would you like to know about ' + currentDisease , ['Symptoms', 'Treatments', 'Common Crops', 'Prevention']);
    },
    function (session, results) {
      switch (results.response.index) {
        case 0:
          // Initiate "Search By Day" dialog
          session.send(diseaseSymptomsArray[currentDisease]);
          break;
          case 1:
          // Initiate "Search By Name" dialog
          session.send(diseaseTreatmentsArray[currentDisease]);
          break;
          case 2:
          // Initiate "Search By Name" dialog
          session.send(diseaseCommonCropsInformationArray[currentDisease]);
          break;
          case 3:
          // Initiate "Search By Name" dialog
          session.send(diseasePreventionInformationArray[currentDisease]);
          break;
        }
      }
])


//asks the farmer to identify the crop that is sick and redirects to the diseaseidentifier dialog for that crop
bot.dialog('pestAndDiseaseIdentifier', [
  function (session, results) {
    builder.Prompts.choice(session, 'What crop is sick?', ['Okra', 'Eggplant', 'Long Bean', 'Pumpkin', 'Cabbage', 'Chilli', 'Paw Paw', 'Tomato', 'Cucumber', 'Cow Peas', 'Cassava', 'Yams', 'Tobacco'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        currentCrop = 'Okra';
        session.beginDialog('okraDiseaseIdentifier');
        break;
      case 1:
        // Initiate "Search By Name" dialog
        currentCrop = 'Eggplant';
        session.beginDialog('eggplantDiseaseIdentifier');
        break;
      case 2:
        // Initiate "Search By Name" dialog
        currentCrop = 'Long Bean';
        session.beginDialog('cropGeneral');
        break;
      case 3:
        // Initiate "Search By Name" dialog
        currentCrop = 'Pumpkin';
        session.beginDialog('cropGeneral');
        break;
      case 4:
        // Initiate "Search By Name" dialog
        currentCrop = 'Cabbage';
        session.beginDialog('cabbageDiseaseIdentifier');
        break;
      case 5:
        // Initiate "Search By Name" dialog
        currentCrop = 'Chilli';
        session.beginDialog('cropGeneral');
        break;
      case 6:
        // Initiate "Search By Time" dialog
        currentCrop = 'Paw Paw';
        session.beginDialog('cropGeneral');
        break;
      case 7:
        // Initiate "Search By Time" dialog
        currentCrop = 'Tomato';
        session.beginDialog('tomatoDiseaseIdentifier');
        break;
      case 8:
        // Initiate "Search By Time" dialog
        currentCrop = 'Cucumber';
        session.beginDialog('cropGeneral');
        break;
      case 9:
        // Initiate "Search By Time" dialog
        currentCrop = 'Cow Peas';
        session.beginDialog('cropGeneral');
        break;
      case 10:
        // Initiate "Search By Time" dialog
        currentCrop = 'Cassava';
        session.beginDialog('cropGeneral');
        break;
      case 11:
        // Initiate "Search By Time" dialog
        currentCrop = 'Yams';
        session.beginDialog('cropGeneral');
        break;
      case 12:
        // Initiate "Search By Time" dialog
        currentCrop = 'Tobacco';
        session.beginDialog('cropGeneral');
        break;
    }
  }
])

//disease identifier dialog for okra
bot.dialog('okraDiseaseIdentifier', [
  function(session, args, next){
    session.send({
      text: 'Photo 1',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'https://www.apsnet.org/publications/imageresources/PublishingImages/2013/fi00197.jpg',
              name: 'okra'
          }
      ]});
    session.send({
      text: 'Photo 2',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://www.infonet-biovision.org/sites/default/files/plant_health/cropsfruitsvegetables/1524_0.jpeg',
              name: 'okra'
          }
      ]});
    session.send({
      text: 'Photo 3',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'https://www.extension.umn.edu/garden/insects/find/flea-beetles/img/flea-beetle-4.jpg',
              name: 'okra'
          }
      ]});
    session.send({
      text: 'Photo 4',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://www.infonet-biovision.org/sites/default/files/plant_health/pestsdiseasesweeds/303.400x400_0.jpeg',
              name: 'okra'
          }
      ]});
      next();
  },
  function (session) {
    builder.Prompts.choice(session, 'Which photo does it look like most?(Tell me 1, 2, 3 etc.)', ['Photo 1', 'Photo 2', 'Photo 3', 'Photo 4'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        currentDisease= 'Powdery Mildew';
        session.beginDialog('diseaseInfoIdentifier');
        break;
      case 1:
        // Initiate "Search By Time" dialog
        currentDisease= 'Black Mould';
        session.beginDialog('diseaseInfoIdentifier');
        break;
      case 2:
        // Initiate "Search By Time" dialog
        currentPest= 'Flea Beetle';
        session.beginDialog('pestInfoIdentifier');
        break;
      case 3:
        // Initiate "Search By Time" dialog
        currentPest= 'Early Blight';
        session.beginDialog('diseaseInfoIdentifier');
        break;
    }
  }
])

//disease identifier dialog for okra
bot.dialog('eggplantDiseaseIdentifier', [
  function(session, args, next){
    session.send({
      text: 'Photo 1',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://msue.anr.msu.edu/uploads/images/2-7-sunscald-on-eggplant-RON.jpg',
              name: 'okra'
          }
      ]});
    session.send({
      text: 'Photo 2',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'https://extension.entm.purdue.edu/veg/insectID_pics/thumbs/Eggplant/EggPlantLeafFleaBtleDmg.jpg',
              name: 'okra'
          }
      ]});
    session.send({
      text: 'Photo 3',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://www.pestnet.org/portals/32/Images/Insects/1070-Thrips%20Fiji/1073-Thrips-palmi.jpg',
              name: 'okra'
          }
      ]});
    session.send({
      text: 'Photo 4',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://www.infonet-biovision.org/sites/default/files/plant_health/cropsfruitsvegetables/1598.400x400_8_0.jpeg?width=500&height=500&iframe=true',
              name: 'okra'
          }
      ]});
      next();
  },
  function (session) {
    builder.Prompts.choice(session, 'Which photo does it look like most?(Tell me 1, 2, 3 etc.)', ['Photo 1', 'Photo 2', 'Photo 3', 'Photo 4'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        currentDisease= 'Sunscald';
        session.beginDialog('diseaseInfoIdentifier');
        break;
      case 1:
        // Initiate "Search By Time" dialog
        currentPest= 'Flea Beetle';
        session.beginDialog('pestInfoIdentifier');
        break;
      case 2:
        // Initiate "Search By Time" dialog
        currentDisease= 'Thrips';
        session.beginDialog('pestInfoIdentifier');
        break;
      case 3:
        // Initiate "Search By Time" dialog
        currentDisease= 'Thrips';
        session.beginDialog('pestInfoIdentifier');
        break;
    }
  }
])

//disease identifier dialog for okra
bot.dialog('longbeanDiseaseIdentifier', [
  function(session, args, next){
    session.send({
      text: 'Photo 1',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'https://www.apsnet.org/publications/imageresources/PublishingImages/2013/fi00197.jpg',
              name: 'okra'
          }
      ]});
    session.send({
      text: 'Photo 2',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://www.pakissan.com/english/allabout/horticulture/images/okra01.jpg',
              name: 'okra'
          }
      ]});
    session.send({
      text: 'Photo 3',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://www.infonet-biovision.org/sites/default/files/plant_health/cropsfruitsvegetables/1522_0.jpeg',
              name: 'okra'
          }
      ]});
      next();
  },
  function (session) {
    builder.Prompts.choice(session, 'Which photo does it look like most?(Tell me 1, 2 or 3)', ['Photo 1', 'Photo 2', 'Photo 3', 'Photo 4'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        currentDisease= 'Nitrogen Deficiency';
        session.beginDialog('diseaseInfoIdentifier');
        break;
      case 1:
        // Initiate "Search By Time" dialog
        currentDisease= 'Black Spot';
        session.beginDialog('diseaseInfoIdentifier');
        break;
      case 2:
        // Initiate "Search By Time" dialog
        currentDisease= 'Anthracnose';
        session.beginDialog('diseaseInfoIdentifier');
        break;
    }
  }
])

//disease identifier dialog for okra
bot.dialog('pumpkinDiseaseIdentifier', [
  function(session, args, next){
    session.send({
      text: 'Photo 1',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'https://www.apsnet.org/publications/imageresources/PublishingImages/2013/fi00197.jpg',
              name: 'okra'
          }
      ]});
    session.send({
      text: 'Photo 2',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://www.pakissan.com/english/allabout/horticulture/images/okra01.jpg',
              name: 'okra'
          }
      ]});
    session.send({
      text: 'Photo 3',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://www.infonet-biovision.org/sites/default/files/plant_health/cropsfruitsvegetables/1522_0.jpeg',
              name: 'okra'
          }
      ]});
      next();
  },
  function (session) {
    builder.Prompts.choice(session, 'Which photo does it look like most?(Tell me 1, 2 or 3)', ['Photo 1', 'Photo 2', 'Photo 3', 'Photo 4'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        currentDisease= 'Nitrogen Deficiency';
        session.beginDialog('diseaseInfoIdentifier');
        break;
      case 1:
        // Initiate "Search By Time" dialog
        currentDisease= 'Black Spot';
        session.beginDialog('diseaseInfoIdentifier');
        break;
      case 2:
        // Initiate "Search By Time" dialog
        currentDisease= 'Anthracnose';
        session.beginDialog('diseaseInfoIdentifier');
        break;
    }
  }
])

//disease identifier dialog for okra
bot.dialog('cabbageDiseaseIdentifier', [
  function(session, args, next){
    session.send({
      text: 'Photo 1',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://www.pestnet.org/fact_sheets/assets/image/chinese_cabbage_flea_beetle_166/chcabbagephyllotreta.jpg',
              name: 'okra'
          }
      ]});
    session.send({
      text: 'Photo 2',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://eorganic.info/sites/eorganic.info/files/u302/other%20cabbage.JPG',
              name: 'okra'
          }
      ]});
    session.send({
      text: 'Photo 3',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://www.pestnet.org/fact_sheets/assets/image/chinese_cabbage_stalk_rot_101/cinesecabwithbactrot.jpg',
              name: 'okra'
          }
      ]});
      next();
  },
  function (session) {
    builder.Prompts.choice(session, 'Which photo does it look like most?(Tell me 1, 2 or 3)', ['Photo 1', 'Photo 2', 'Photo 3', 'Photo 4'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        currentPest= 'Flea Beetle';
        session.beginDialog('pestInfoIdentifier');
        break;
      case 1:
        // Initiate "Search By Time" dialog
        currentDisease= 'Black Spot';
        session.beginDialog('diseaseInfoIdentifier');
        break;
      case 2:
        // Initiate "Search By Time" dialog
        currentDisease= 'Stalk Rot';
        session.beginDialog('diseaseInfoIdentifier');
        break;
    }
  }
])

//disease identifier dialog for okra
bot.dialog('chilliDiseaseIdentifier', [
  function(session, args, next){
    session.send({
      text: 'Photo 1',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'https://www.apsnet.org/publications/imageresources/PublishingImages/2013/fi00197.jpg',
              name: 'okra'
          }
      ]});
    session.send({
      text: 'Photo 2',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://www.pakissan.com/english/allabout/horticulture/images/okra01.jpg',
              name: 'okra'
          }
      ]});
    session.send({
      text: 'Photo 3',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://www.infonet-biovision.org/sites/default/files/plant_health/cropsfruitsvegetables/1522_0.jpeg',
              name: 'okra'
          }
      ]});
      next();
  },
  function (session) {
    builder.Prompts.choice(session, 'Which photo does it look like most?(Tell me 1, 2 or 3)', ['Photo 1', 'Photo 2', 'Photo 3', 'Photo 4'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        currentDisease= 'Nitrogen Deficiency';
        session.beginDialog('diseaseInfoIdentifier');
        break;
      case 1:
        // Initiate "Search By Time" dialog
        currentDisease= 'Black Spot';
        session.beginDialog('diseaseInfoIdentifier');
        break;
      case 2:
        // Initiate "Search By Time" dialog
        currentDisease= 'Anthracnose';
        session.beginDialog('diseaseInfoIdentifier');
        break;
    }
  }
])

//disease identifier dialog for okra
bot.dialog('pawpawDiseaseIdentifier', [
  function(session, args, next){
    session.send({
      text: 'Photo 1',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'https://www.apsnet.org/publications/imageresources/PublishingImages/2013/fi00197.jpg',
              name: 'okra'
          }
      ]});
    session.send({
      text: 'Photo 2',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://www.pakissan.com/english/allabout/horticulture/images/okra01.jpg',
              name: 'okra'
          }
      ]});
    session.send({
      text: 'Photo 3',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://www.infonet-biovision.org/sites/default/files/plant_health/cropsfruitsvegetables/1522_0.jpeg',
              name: 'okra'
          }
      ]});
      next();
  },
  function (session) {
    builder.Prompts.choice(session, 'Which photo does it look like most?(Tell me 1, 2 or 3)', ['Photo 1', 'Photo 2', 'Photo 3', 'Photo 4'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        currentDisease= 'Nitrogen Deficiency';
        session.beginDialog('diseaseInfoIdentifier');
        break;
      case 1:
        // Initiate "Search By Time" dialog
        currentDisease= 'Black Spot';
        session.beginDialog('diseaseInfoIdentifier');
        break;
      case 2:
        // Initiate "Search By Time" dialog
        currentDisease= 'Anthracnose';
        session.beginDialog('diseaseInfoIdentifier');
        break;
    }
  }
])

//disease identifier dialog for okra
bot.dialog('tomatoDiseaseIdentifier', [
  function(session, args, next){
    session.send({
      text: 'Photo 1',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://www.pestnet.org/fact_sheets/assets/image/tomato_early_blight_211/alternariasol1.jpg',
              name: 'okra'
          }
      ]});
    session.send({
      text: 'Photo 2',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://www.pestnet.org/fact_sheets/assets/image/tomato_early_blight_211/alternariasolfruit.jpg',
              name: 'okra'
          }
      ]});
      next();
  },
  function (session) {
    builder.Prompts.choice(session, 'Which photo does it look like most?(Tell me 1, 2 or 3)', ['Photo 1', 'Photo 2'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        currentDisease= 'Early Blight';
        session.beginDialog('diseaseInfoIdentifier');
        break;
      case 1:
        // Initiate "Search By Time" dialog
        currentDisease= 'Early Blight';
        session.beginDialog('diseaseInfoIdentifier');
        break;
    }
  }
])

//disease identifier dialog for okra
bot.dialog('cucumberDiseaseIdentifier', [
  function(session, args, next){
    session.send({
      text: 'Photo 1',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'https://www.apsnet.org/publications/imageresources/PublishingImages/2013/fi00197.jpg',
              name: 'okra'
          }
      ]});
    session.send({
      text: 'Photo 2',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://www.pakissan.com/english/allabout/horticulture/images/okra01.jpg',
              name: 'okra'
          }
      ]});
    session.send({
      text: 'Photo 3',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://www.infonet-biovision.org/sites/default/files/plant_health/cropsfruitsvegetables/1522_0.jpeg',
              name: 'okra'
          }
      ]});
      next();
  },
  function (session) {
    builder.Prompts.choice(session, 'Which photo does it look like most?(Tell me 1, 2 or 3)', ['Photo 1', 'Photo 2', 'Photo 3', 'Photo 4'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        currentDisease= 'Nitrogen Deficiency';
        session.beginDialog('diseaseInfoIdentifier');
        break;
      case 1:
        // Initiate "Search By Time" dialog
        currentDisease= 'Black Spot';
        session.beginDialog('diseaseInfoIdentifier');
        break;
      case 2:
        // Initiate "Search By Time" dialog
        currentDisease= 'Anthracnose';
        session.beginDialog('diseaseInfoIdentifier');
        break;
    }
  }
])

//disease identifier dialog for okra
bot.dialog('cowpeasDiseaseIdentifier', [
  function(session, args, next){
    session.send({
      text: 'Photo 1',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'https://www.apsnet.org/publications/imageresources/PublishingImages/2013/fi00197.jpg',
              name: 'okra'
          }
      ]});
    session.send({
      text: 'Photo 2',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://www.pakissan.com/english/allabout/horticulture/images/okra01.jpg',
              name: 'okra'
          }
      ]});
    session.send({
      text: 'Photo 3',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://www.infonet-biovision.org/sites/default/files/plant_health/cropsfruitsvegetables/1522_0.jpeg',
              name: 'okra'
          }
      ]});
      next();
  },
  function (session) {
    builder.Prompts.choice(session, 'Which photo does it look like most?(Tell me 1, 2 or 3)', ['Photo 1', 'Photo 2', 'Photo 3', 'Photo 4'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        currentDisease= 'Nitrogen Deficiency';
        session.beginDialog('diseaseInfoIdentifier');
        break;
      case 1:
        // Initiate "Search By Time" dialog
        currentDisease= 'Black Spot';
        session.beginDialog('diseaseInfoIdentifier');
        break;
      case 2:
        // Initiate "Search By Time" dialog
        currentDisease= 'Anthracnose';
        session.beginDialog('diseaseInfoIdentifier');
        break;
    }
  }
])

//disease identifier dialog for okra
bot.dialog('yamsDiseaseIdentifier', [
  function(session, args, next){
    session.send({
      text: 'Photo 1',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'https://www.apsnet.org/publications/imageresources/PublishingImages/2013/fi00197.jpg',
              name: 'okra'
          }
      ]});
    session.send({
      text: 'Photo 2',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://www.pakissan.com/english/allabout/horticulture/images/okra01.jpg',
              name: 'okra'
          }
      ]});
    session.send({
      text: 'Photo 3',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://www.infonet-biovision.org/sites/default/files/plant_health/cropsfruitsvegetables/1522_0.jpeg',
              name: 'okra'
          }
      ]});
      next();
  },
  function (session) {
    builder.Prompts.choice(session, 'Which photo does it look like most?(Tell me 1, 2 or 3)', ['Photo 1', 'Photo 2', 'Photo 3', 'Photo 4'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        currentDisease= 'Nitrogen Deficiency';
        session.beginDialog('diseaseInfoIdentifier');
        break;
      case 1:
        // Initiate "Search By Time" dialog
        currentDisease= 'Black Spot';
        session.beginDialog('diseaseInfoIdentifier');
        break;
      case 2:
        // Initiate "Search By Time" dialog
        currentDisease= 'Anthracnose';
        session.beginDialog('diseaseInfoIdentifier');
        break;
    }
  }
])

//disease identifier dialog for okra
bot.dialog('tobaccoDiseaseIdentifier', [
  function(session, args, next){
    session.send({
      text: 'Photo 1',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'https://www.apsnet.org/publications/imageresources/PublishingImages/2013/fi00197.jpg',
              name: 'okra'
          }
      ]});
    session.send({
      text: 'Photo 2',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://www.pakissan.com/english/allabout/horticulture/images/okra01.jpg',
              name: 'okra'
          }
      ]});
    session.send({
      text: 'Photo 3',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://www.infonet-biovision.org/sites/default/files/plant_health/cropsfruitsvegetables/1522_0.jpeg',
              name: 'okra'
          }
      ]});
      next();
  },
  function (session) {
    builder.Prompts.choice(session, 'Which photo does it look like most?(Tell me 1, 2 or 3)', ['Photo 1', 'Photo 2', 'Photo 3', 'Photo 4'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        currentDisease= 'Nitrogen Deficiency';
        session.beginDialog('diseaseInfoIdentifier');
        break;
      case 1:
        // Initiate "Search By Time" dialog
        currentDisease= 'Black Spot';
        session.beginDialog('diseaseInfoIdentifier');
        break;
      case 2:
        // Initiate "Search By Time" dialog
        currentDisease= 'Anthracnose';
        session.beginDialog('diseaseInfoIdentifier');
        break;
    }
  }
])

//disease identifier dialog for okra
bot.dialog('cassavaDiseaseIdentifier', [
  function(session, args, next){
    session.send({
      text: 'Photo 1',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'https://www.apsnet.org/publications/imageresources/PublishingImages/2013/fi00197.jpg',
              name: 'okra'
          }
      ]});
    session.send({
      text: 'Photo 2',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://www.pakissan.com/english/allabout/horticulture/images/okra01.jpg',
              name: 'okra'
          }
      ]});
    session.send({
      text: 'Photo 3',
      attachments: [
          {
              contentType: 'image/jpeg',
              contentUrl:'http://www.infonet-biovision.org/sites/default/files/plant_health/cropsfruitsvegetables/1522_0.jpeg',
              name: 'okra'
          }
      ]});
      next();
  },
  function (session) {
    builder.Prompts.choice(session, 'Which photo does it look like most?(Tell me 1, 2 or 3)', ['Photo 1', 'Photo 2', 'Photo 3', 'Photo 4'])
  },
  function (session, results) {
    switch (results.response.index) {
      case 0:
        // Initiate "Search By Day" dialog
        currentDisease= 'Nitrogen Deficiency';
        session.beginDialog('diseaseInfoIdentifier');
        break;
      case 1:
        // Initiate "Search By Time" dialog
        currentDisease= 'Black Spot';
        session.beginDialog('diseaseInfoIdentifier');
        break;
      case 2:
        // Initiate "Search By Time" dialog
        currentDisease= 'Anthracnose';
        session.beginDialog('diseaseInfoIdentifier');
        break;
    }
  }
])

//=========================//
//pest name
//=========================//
bot.dialog('pestGeneral', [
    function (session) {
        builder.Prompts.confirm(session, 'Would you like to know more about ' + currentPest + '?');
    },
    function (session, results){
      if (results.response){
        session.beginDialog('pestInfoGeneral');
        }
      else{
        session.beginDialog('/mainmenu', results);
      }
    }
]);

bot.dialog('pestInfoGeneral', [
  function(session, results) {
      builder.Prompts.choice(session, 'What would you like to know about ' + currentPest + '?' , ['Symptoms', 'Treatments', 'Common Crops', 'Prevention']);
    },
    function (session, results) {
      switch (results.response.index) {
        case 0:
          // Initiate "Search By Day" dialog
          session.send(pestSymptomsArray[currentPest]);
          break;
          case 1:
          // Initiate "Search By Name" dialog
          session.send(pestTreatmentsArray[currentPest]);
          break;
          case 2:
          // Initiate "Search By Name" dialog
          session.send(pestCommonCropsInformationArray[currentPest]);
          break;
          case 3:
          // Initiate "Search By Name" dialog
          session.send(pestPreventionInformationArray[currentPest]);
          break;
        }
      }
])

bot.dialog('pestInfoIdentifier', [
  function(session, results) {
      builder.Prompts.choice(session, 'It seems you could potentially have ' + currentPest + '. What would you like to know about ' + currentPest , ['Symptoms', 'Treatments', 'Common Crops', 'Prevention']);
    },
    function (session, results) {
      switch (results.response.index) {
        case 0:
          // Initiate "Search By Day" dialog
          session.send(pestSymptomsArray[currentPest]);
          break;
          case 1:
          // Initiate "Search By Name" dialog
          session.send(pestTreatmentsArray[currentPest]);
          break;
          case 2:
          // Initiate "Search By Name" dialog
          session.send(pestCommonCropsInformationArray[currentPest]);
          break;
          case 3:
          // Initiate "Search By Name" dialog
          session.send(pestPreventionInformationArray[currentPest]);
          break;
        }
      }
])

//=========================//
//Pesticide info
//=========================//
bot.dialog('pesticideGeneral', [
    function (session) {
        builder.Prompts.confirm(session, 'Would you like to know more about ' + currentPesticide + ' ?');
    },
    function (session, results){
      if (results.response){
        session.beginDialog('pesticideInfoGeneral');
        }
      else{
        session.beginDialog('/mainmenu', results);
      }
    }
]);

bot.dialog('pesticideInfoGeneral', [
  function(session, results) {
      builder.Prompts.choice(session, 'What would you like to know about' + currentPesticide + ' ?', ['How to use?', 'Where to buy?', 'How much does it cost?']);
    },
    function (session, results) {
      switch (results.response.index) {
        case 0:
          // Initiate "Search By Day" dialog
          session.send(pesticideUsageInfoArray[currentPesticide]);
          break;
          case 1:
          // Initiate "Search By Name" dialog
          session.send(pesticideWhereToBuyInfoArray[currentPesticide]);
          break;
          case 2:
          // Initiate "Search By Name" dialog
          session.send(pesticideCostsInfoArray[currentPesticide]);
          break;
        }
      }
])

//=========================//
//Fetiliser info
//=========================//
bot.dialog('fertiliserGeneral', [
    function (session) {
        builder.Prompts.confirm(session, 'Would you like to know more about ' + currentFertiliser + ' ?');
    },
    function (session, results){
      if (results.response){
        session.beginDialog('fertiliserInfoGeneral');
        }
      else{
        session.beginDialog('/mainmenu', results);
      }
    }
]);

bot.dialog('fertiliserInfoGeneral', [
  function(session, results) {
      builder.Prompts.choice(session, 'What would you like to know about' + currentFertiliser + ' ?', ['How to use?', 'Where to buy?', 'How much does it cost?']);
    },
    function (session, results) {
      switch (results.response.index) {
        case 0:
          // Initiate "Search By Day" dialog
          session.send(fertiliserUsageInfoArray[currentFertiliser]);
          break;
          case 1:
          // Initiate "Search By Name" dialog
          session.send(fertiliserWhereToBuyArrayInfoArray[currentFertiliser]);
          break;
          case 2:
          // Initiate "Search By Name" dialog
          session.send(fertiliserCostsArrayInfoArray[currentFertiliser]);
          break;
        }
      }
])

//=========================//
//Machinery info
//=========================//
bot.dialog('machineryGeneral', [
    function (session) {
        builder.Prompts.confirm(session, 'Would you like to know more about ' + currentMachine + ' ?');
    },
    function (session, results){
      if (results.response){
        session.beginDialog('machineryInfoGeneral');
        }
      else{
        session.beginDialog('/mainmenu', results);
      }
    }
]);

bot.dialog('machineryInfoGeneral', [
  function(session, results) {
      builder.Prompts.choice(session, 'What would you like to know about' + currentMachine + ' ?', ['How to use?', 'Where to buy?', 'How much does it cost?']);
    },
    function (session, results) {
      switch (results.response.index) {
        case 0:
          // Initiate "Search By Day" dialog
          session.send(machineryUsageInfoArray[currentMachine]);
          break;
          case 1:
          // Initiate "Search By Name" dialog
          session.send(machineryWhereToBuyInfoArray[currentMachine]);
          break;
          case 2:
          // Initiate "Search By Name" dialog
          session.send(machineryCostsInfoArray[currentMachine]);
          break;
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
