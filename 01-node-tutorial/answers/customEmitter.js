const EventEmitter = require('events');

const emitterA = new EventEmitter();
const emitterB = new EventEmitter();

// BASIC EVENTS
emitterA.on('greet', name => {
  console.log(`A received greeting for: ${name}`);
});

// Emit event with parameter
emitterA.emit('greet', 'Aya');

//  EVENT CHAINING
emitterA.on('start', () => {
  console.log("A received 'start' event — triggering B's 'response'");
  emitterB.emit('response', 'Hello from A → B!');
});

emitterB.on('response', msg => {
  console.log('B received response:', msg);
});

// Fire the first event
emitterA.emit('start');

//  TIMER-BASED EVENTS

const timerEmitter = new EventEmitter();

timerEmitter.on('tick', message => {
  console.log('Timer event:', message);
});

setInterval(() => {
  timerEmitter.emit('tick', 'Tick-tock!');
}, 2000);

// 4. ASYNC WAIT FOR EVENT

const asyncEmitter = new EventEmitter();

// Returns a Promise that resolves when event happens
const waitForEvent = () => {
  return new Promise(resolve => {
    asyncEmitter.on('happens', msg => resolve(msg));
  });
};

const doWait = async () => {
  const msg = await waitForEvent(); // waits for emit
  console.log('We got an event! Here it is:', msg);
};

doWait();

// event AFTER a delay
setTimeout(() => {
  asyncEmitter.emit('happens', 'Hello World from asyncEmitter!');
}, 3000);
