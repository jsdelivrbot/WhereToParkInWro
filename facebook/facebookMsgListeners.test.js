var facebookMsgListeners = require('./facebookMsgListeners.js')

describe('integration tests', () => {
  it('should sent map if coordinates provided by user', () => {
    expect(facebookMsgListeners.buildReplyTo({message: "location"})).toEqual(
      {
       "message": {
         "quick_replies": [
           {
             "content_type": "location",
           },
         ],
         "text": "Give me your location",
       },
       "recipient": {
         "id": undefined,
       },
     }
    )
  })

  it('should sent map if coordinates provided by user', () => {
    expect(facebookMsgListeners.buildReplyTo({message: "location"})).toEqual(
      {
       "message": {
         "quick_replies": [
           {
             "content_type": "location",
           },
         ],
         "text": "Give me your location",
       },
       "recipient": {
         "id": undefined,
       },
     }
    )
  })
})
