module.exports = (data) => {
    var messages = [];
    // Make sure this is a page subscription
    if (data.object === 'page') {
          // Iterate over each entry - there may be multiple if batched
          if(data.entry) {
            data.entry.forEach(function(entry) {
              // Iterate over each messaging event
              if(entry.messaging) {
                entry.messaging.forEach(function(event) {
                  if (event.message) {
                    messages.push(
                      {
                        message: event.message.text,
                        senderId: event.sender.id,
                        attachments: event.message.attachments
                      });
                  } else {
                    console.log("Webhook received unknown event: ", event);
                  }
                });
              }
            }
          )
        };    
    }
    return messages;
  }