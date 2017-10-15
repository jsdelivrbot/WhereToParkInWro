var express = require('express');
var test = require('./test-module.js')
var app = express();
var lastResp = null;
var facebookApi = require('./facebook/facebookApi.js');
var facebookApiIntegation = require('./facebook/facebookApiIntegration.js')
var facebookMessageParser = require('./facebook/facebookMessageParser.js');
var bodyParser = require('body-parser');
var messageFactory = require('./facebook/facebookMsgListeners.js')
var locationListener = require('./facebook/locationListener.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('port', (process.env.PORT || 5000));

app.get('/webhook', facebookApiIntegation);

app.post('/webhook', function (req, res) {
  var data = req.body;

  var messages = facebookMessageParser(data);
  messages.forEach(function(message) {
    facebookApi.callSendAPI(messageFactory.buildReplyTo(message))
  });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
    res.sendStatus(200);
  }
);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
