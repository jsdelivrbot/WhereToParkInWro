var facebookApi = require('./facebookApi')
const theParkListener = {
   
  run: (message) => {
    message = 
    {
        "recipient": {"id": "1483947914992026"},
        "message": {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": {
                        "element": {
                            "title": "Your current location",
                            "image_url": "https:\/\/maps.googleapis.com\/maps\/api\/staticmap?size=764x400&center=51,17&zoom=25&markers=51,17",
                            "item_url": "http:\/\/maps.apple.com\/maps?q=51,17&z=16"
                        }
                    }
                }
            }
        }
    },  
    facebookApi.sendMessage(message.senderId, message.message)}
}

module.exports = theParkListener