var facebookMsgListeners = require('./facebookMsgListeners.js')

describe('Run all', () => {
  const listener1 = {run: jest.fn(()=>true)};
  const listener2 = {run: jest.fn()};
  it('should run all listeners', () => {
    facebookMsgListeners.runAll("my message", [listener1, listener2])
    expect(listener1.run).toBeCalled()
    expect(listener2.run).toBeCalled()
  })
})

describe('run untill handled', () => {
    const listener1 = {run: jest.fn(()=> true)};
    const listener2 = {run: jest.fn()};
    
  it('shouldStopAfterFirst handled', () => {
      facebookMsgListeners.runUntilHandled("my message", [listener1, listener2])
      expect(listener1.run).toBeCalled()
      expect(listener2.run).not.toBeCalled()
    })

  it('shouldStopAfterFirst handled', () => {
    listener1.run = jest.fn();
    facebookMsgListeners.runUntilHandled("my message", [listener1, listener2])
    expect(listener1.run).toBeCalled()
    expect(listener2.run).toBeCalled()
  })  
})

