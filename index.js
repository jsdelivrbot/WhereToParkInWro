var express = require('express');
var test = require('./test-module.js')
var app = express();
var lastResp = null;
var facebookApi = require('./facebookApi.js');
var facebookMessageParser = require('./facebookMessageParser.js');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
  res.send("Try it!!!");
})

app.get('/webhook', facebookApi.validation);

app.get('/es6', (request, response) => {response.send('Works even better!!!')})

app.get('/test', test.testMethod)

app.post('/webhook', function (req, res) {
  var data = req.body;

  var messages = facebookMessageParser.parseMessages(data);
  messages.forEach(function(message) {
    if (message.message === 'location') {
      facebookApi.askForLocation(message.senderId, message.message);
    }
    facebookApi.sendMessage(message.senderId, message.message);
    console.log(message);
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
