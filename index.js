var express = require('express');
var app = express();
var lastResp = null;
var facebookApi = require('./facebookApi.js');
var senderID
var recipientID
var timeOfMessage
var message

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/webhook', facebookApi.validation);

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/valid', function(request, response) {
  // response.send("Well, last time it:" + lastResp === 200 ? 'Worked' : "Error " + lastResp);
  response.send(
    {senderID,   recipientID,  timeOfMessage, message})
});

app.post('/webhook', function (req, res) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      var pageID = entry.id;
      var timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        if (event.message) {
          receivedMessage(event);
        } else {
          console.log("Webhook received unknown event: ", event);
        }
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
    res.sendStatus(200);
  }
});


function receivedMessage(event) {
  senderID = event.sender.id;
  recipientID = event.recipient.id;
  timeOfMessage = event.timestamp;
  message = event.message;

  console.log("Received message for user %d and page %d at %d with message:",
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var messageId = message.mid;

  var messageText = message.text;
  var messageAttachments = message.attachments;


  if(messageText=='magic'){
    sendStructuredMessage(senderID);
  } else {
    echo(senderID, messageText);
  }

}

function echo(recipientId, messageText){
  // Construct reply message
  var echo = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  facebookApi.callSendAPI(echo);
}


function sendStructuredMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "Codecool",
            subtitle: "The best programming school",
            item_url: "https://codecool.pl/",
            image_url: "https://crossweb.pl/job/wp-content/uploads/2016/06/codecool.png",
            buttons: [{
              type: "web_url",
              url: "https://codecool.pl/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback One", // button text
              payload: "Payload for first bubble", // postback body
            }],
          }, {
            title: "DevCamp",
            subtitle: "The best IT event",
            item_url: "http://devcamp.pl/",
            image_url: "https://d1ll4kxfi4ofbm.cloudfront.net/images/621921/3af0f2b904c54475f17a7919b166e900.png",
            buttons: [{
              type: "web_url",
              url: "http://devcamp.pl/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback Two",
              payload: "Payload for second bubble",
            }]
          }]
        }
      }
    }
  };

  facebookApi.callSendAPI(messageData);
}

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
