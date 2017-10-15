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
                        "title": "Your nearest parking",
                        "image_url": `https:\/\/maps.googleapis.com\/maps\/api\/staticmap?size=764x400&center=${getLat(coordinates)},${getLong(coordinates)}&zoom=14&markers=${getLat(coordinates)},${getLong(coordinates)}`,
                        "item_url": `http:\/\/maps.apple.com\/maps?q=${getLat(coordinates)},${getLong(coordinates)}&z=14`
                    }
                }
            }
        }
    }
})

const getLat = (coordinates) => coordinates.lat+0.0009
const getLong = (coordinates) => coordinates.long+0.0010

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