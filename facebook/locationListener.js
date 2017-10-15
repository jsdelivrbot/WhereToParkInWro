const locationListener = {
  run: (message) => {
    if(message.message.indexOf('location') !== -1) {
      facebookApi.askForLocation(message.senderId, message.message)
    }
  }
}

module.exports = locationListener