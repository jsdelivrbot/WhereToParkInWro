var listener = require('./locationListener.js')


const messageWithLocationAttachment = {
  "senderId":"1483947914992026",
  "attachments":
  [
      {
          "title":"Maciej's Location",
          "url":"https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.bing.com%2Fmaps%2Fdefault.aspx%3Fv%3D2%26pc%3DFACEBK%26mid%3D8100%26where1%3D51.1078504%252C%2B17.0777716%26FORM%3DFBKPL1%26mkt%3Den-US&h=ATOS-ijQDjXlMCAFmy7Mzn4Rh7p3vLT2Qy9T7GbQQ_pP0xmEEuGQqPCCWkefmszlu2ghGUFVohnku3QgFwZQ_XpUnpQhGfvv7CLTrogMMbRBPoNkmA&s=1&enc=AZNun2ahjeMAbHOOZlkLnBp2CYMG99MwrpvsPq8CjKTIecSTcPFe4iGvR4M57V1JD6DA86L3Ef0lB7b1vQOrY6UX",
          "type":"location",
          "payload": {
              "coordinates": { 
                  "lat":51.1078504,"long":17.0777716
                  }
              }
          }
  ]
}

const messageWithLocationString = {
  "senderId":"1483947914992026",
  message: "location"
}

const messageWithoutLocationAttachment = {
  "senderId":"1483947914992026",
  message:"No!!!!"
}

describe('locationListener', () => {

  it('should ask for location when message is location', () => {
    const result = listener.run(messageWithLocationString);
    expect(result).toBeTruthy()
    expect(result).toEqual(
      {
        "message": {
          text: "Give me your location",
          "quick_replies": [
            {
              "content_type": "location",
            },
          ]
        },
        "recipient": {
          "id": "1483947914992026"
        }
      }
    )
  })

  it('should parse location from fb', () => {
    const response = listener.run(messageWithLocationAttachment)
    expect(response).toBeTruthy()
    expect(response).toEqual({
      "recipient": {
      "id": "1483947914992026"
     },
      message: {
     "attachment": {
         "payload": {
           "elements": {
             "element": {
                "image_url": "https://maps.googleapis.com/maps/api/staticmap?size=764x400&center=51.1087504,17.0787716&zoom=14&markers=51.1087504,17.0787716",
                "item_url": "http://maps.apple.com/maps?q=51.1087504,17.0787716&z=14",
                "title": "Your nearest parking",
              }
           },
           "template_type": "generic",
          },
          "type": "template"
  }}})
})

  it('should ignore message without location', () => {
    expect(listener.run(messageWithoutLocationAttachment)).toBeFalsy()
  })

  
  it('should ignore empty message', () => {
    expect(listener.run()).toBeFalsy()
  })
})