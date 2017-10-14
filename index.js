var express = require('express');
var app = express();
var lastResp = null;

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/webhook', function(req, res){
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === "MyRouters") {
        //Just don't change the bloody password above
    console.log("Validating webhook");
    //So the facebook's messenger will be validating this..
    res.status(200).send(req.query['hub.challenge']);
    lastResp = 200;
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
    lastResp = 403;
  }
});

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/pingme', function(request, response) {
  response.send("Bite my shiny metal ass..");
});

app.get('/valid', function(request, response) {
  response.send("Well, last time it:" + lastResp == 200 ? 'Worked' : "Error " + lastResp);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
