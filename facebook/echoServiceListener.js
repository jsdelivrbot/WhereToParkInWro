const echoServiceListener = {
  run: (message) => echo(message.senderId, message.message)
}

const echo = (recipientId, messageText) => {    // Construct reply message
  return {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };
}

module.exports = echoServiceListener