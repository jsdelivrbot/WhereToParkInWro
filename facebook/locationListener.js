var facebookApi = require('./facebookApi.js')
const locationListener = {
  run: (message) => {
    if(message && message.message && message.message.indexOf('location') !== -1) {
      facebookApi.askForLocation(message.senderId, message.message)
      return true;
    }
  }
}

module.exports = locationListener