const echoServiceListener =require('./echoServiceListener')

const messageWithoutLocationAttachment = {
  "senderId":"1483947914992026",
  message:"No!!!!"
}

describe('EchoService', () => {
  it('should send message back to propper person', ()=> {
    expect(echoServiceListener.run(messageWithoutLocationAttachment).recipient.id).toEqual("1483947914992026")
  })
  
  it('should send message back to propper person', ()=> {
    expect(echoServiceListener.run(messageWithoutLocationAttachment).message.text).toEqual("No!!!!")
  })
})