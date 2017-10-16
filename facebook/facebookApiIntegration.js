
const validation = (req, res) => {
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
}

module.exports = validation