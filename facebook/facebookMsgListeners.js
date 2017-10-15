var facebookApi = require('./facebookApi.js')
var locationListener = require('./locationListener.js')
var echoServiceListener = require('./echoServiceListener.js')

const debug = {
  run: (message) => console.log(message)
}

module.exports = {
  listeners: [
    locationListener,
    echoServiceListener,
    debug
  ]
}
