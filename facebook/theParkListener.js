var facebookApi = require('./facebookApi')
const theParkListener = {
  run: (message) => {
    message = 
    {
        "recipient": {"id": "1686837728027907"},
        "message": {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": {
                        "element": {
                            "title": "Your current location",
                            "image_url": "https:\/\/maps.googleapis.com\/maps\/api\/staticmap?size=764x400&center=51.00,17.00&zoom=25&markers=51.00,17.00",
                            "item_url": "http:\/\/maps.apple.com\/maps?q=51.00,17.00&z=16"
                        }
                    }
                }
            }
        }
    }  
    // facebookApi.callSendAPI(message);
}
}

module.exports = theParkListener