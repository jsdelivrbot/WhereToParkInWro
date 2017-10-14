var express = require('express');
var app = express();
var lastResp = null;
var facebookApi = require('./facebookApi.js');

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
  response.send("Well, last time it:" + lastResp === 200 ? 'Worked' : "Error " + lastResp);
});

// app.post('/webhook', function(request, response) {
//   // response.send('Hi there!!!');
//   facebookApi.callSendAPI("Hi There!!!")
// })

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
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

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

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
