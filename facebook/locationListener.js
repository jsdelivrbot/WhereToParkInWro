var facebookApi = require('./facebookApi.js')
var _ = require('lodash')

const locationListener = {
  run: (message) => {
    if(message) {
      if(message.attachments &&
        message.attachments.some(attachment => attachment.type === 'location')) {
        var coordinates = message.attachments[0].payload.coordinates
        return sentMap(message.senderId, coordinates)
      }
      if(message.message && message.message.indexOf('location') !== -1) {
        return askForLocation(message.senderId)
      }
    }
  }
}

const sentMap = (recipient_id, coordinates) => ({
    "recipient": {"id": recipient_id},
    "message": {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": {
                    "element": {
                        "title": "Your current location",
                        "image_url": `https:\/\/maps.googleapis.com\/maps\/api\/staticmap?size=764x400&center=${coordinates.lat},${coordinates.long}&zoom=14&markers=${coordinates.lat},${coordinates.long}`,
                        "item_url": `http:\/\/maps.apple.com\/maps?q=${coordinates.lat},${coordinates.long}&z=14`
                    }
                }
            }
        }
    }
})

const askForLocation = (recipient_id) => (
  {
    recipient: {
      id: recipient_id
    },
    message: {
      text: "Give me your location",
      quick_replies:[
        {
          "content_type":"location"
        }
      ]
    }
  })

module.exports = locationListener