var facebookApi = require('./facebookApi.js')
var _ = require('lodash')

const locationListener = {
  run: (message) => {
    if(message) {
      if(message.attachments &&
        message.attachments.some(attachment => attachment.type === 'location')) {
        var coordinates = message.attachments[0].payload.coordinates
        return sentMap(message.senderId, message.attachments)
      }
      if(message.message && message.message.indexOf('location') !== -1) {
        return askForLocation(message.senderId)
      }
    }
  }
}
const sentMap = (recipient_id, attachments) => ({
    "recipient": {"id": recipient_id},
    "message": {
      attachments: attachments
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