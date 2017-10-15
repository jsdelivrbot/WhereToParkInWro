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
// "attachments":
// [
//     {
//         "title":"Maciej's Location",
//         "url":"https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.bing.com%2Fmaps%2Fdefault.aspx%3Fv%3D2%26pc%3DFACEBK%26mid%3D8100%26where1%3D51.1078504%252C%2B17.0777716%26FORM%3DFBKPL1%26mkt%3Den-US&h=ATOS-ijQDjXlMCAFmy7Mzn4Rh7p3vLT2Qy9T7GbQQ_pP0xmEEuGQqPCCWkefmszlu2ghGUFVohnku3QgFwZQ_XpUnpQhGfvv7CLTrogMMbRBPoNkmA&s=1&enc=AZNun2ahjeMAbHOOZlkLnBp2CYMG99MwrpvsPq8CjKTIecSTcPFe4iGvR4M57V1JD6DA86L3Ef0lB7b1vQOrY6UX",
//         "type":"location",
//         "payload": {
//             "coordinates": { 
//                 "lat":51.1078504,"long":17.0777716
//                 }
//             }
//         }
// ]
const sentMap = (recipient_id, attachments) => ({
    "recipient": {"id": recipient_id},
    "message": {
<<<<<<< HEAD
      attachments
=======
        // "attachment": {
        //     "type": "template",
        //     "payload": {
        //         "template_type": "generic",
        //         "elements": {
        //             "element": {
        //                 "title": "Your current location",
        //                 "image_url": `https:\/\/maps.googleapis.com\/maps\/api\/staticmap?size=764x400&center=${coordinates.lat},${coordinates.long}&zoom=25&markers=${coordinates.lat},${coordinates.long}`,
        //                 "item_url": `http:\/\/maps.apple.com\/maps?q=${coordinates.lat},${coordinates.long}&z=16`
        //             }
        //         }
        //     }
        // }
        "attachment": {
              "type": "template",
              "payload": {
                "template_type": "generic",
                "elements": [{
                  "title": 'Nearest parking',
                  "subtitle": "Ride there, please..",
                  "image_url": "https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyD_W98Jqf_YqRu55ixSEm_lHkHrSoAyUps" +
                  "&markers=color:red|label:B|51,17&size=360x360&zoom=13"
                }]
              }
            }
>>>>>>> 1407d49add80c463648e12842547402617941f8b
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