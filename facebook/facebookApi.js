var request = require('request');
var _ = require('lodash');

module.exports = {
  callSendAPI(messageData) {
    request({
      uri: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: 'EAAUynTT85XgBAGWHEGfblN7wn3RwWOv1sAhYtQfMtI022LP3y0osWLrYiCm1FEp1frvcXfPCMKDY1xnIMWoPf8EbETs2DV8EoqgxzQB2ZAhELKUr14JwS3P1YwJhMteGJneGSwwxeu2rHjLNZAZCCZAUq0kAxOgOjNzgWijLaQZDZD' },
      method: 'POST',
      json: messageData

    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var recipientId = body.recipient_id;
        var messageId = body.message_id;

        console.log("Successfully sent generic message with id %s to recipient %s",
          messageId, recipientId);
      } else {
        console.error("Unable to send message.");
        console.error(response);
        console.error(error);
      }
    });
  },

  sendMessage(recipientId, messageText){
    // Construct reply message
    var echo = {
      recipient: {
        id: recipientId
      },
      message: {
        text: messageText
      }
    };

    this.callSendAPI(echo);
  },

  askForLocation(recipientId, messageText) {
    var askForLocation = {
      recipient: {
        id: recipientId
      },
      message: {
        text: messageText,
        quick_replies:[
          {
            "content_type":"location"
          }
        ]
      },
    }
    this.callSendAPI(askForLocation)
  }
}