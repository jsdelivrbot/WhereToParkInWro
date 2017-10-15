var facebookApi = require('./facebookApi')

describe('should send data with callSendAPI', () => {
  const orginalCallSendAPI = facebookApi.callSendAPI
  const fakeCallSendAPI = jest.fn();
  beforeAll(()=> {
    facebookApi.callSendAPI = fakeCallSendAPI
  })

  afterAll(()=> {
    facebookApi.callSendAPI = orginalCallSendAPI
  })

  it('should send echo to sender', () => {
    facebookApi.sendMessage(3, "test");
    expect(fakeCallSendAPI).toHaveBeenCalledWith({
        recipient: {
          id: 3
        },
        message: {
          text: "test"
        }
      })
  })
})