'use strict';

// taken from stackoverflow. 
function generateUUID() {
  var d = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return ((c == "x" ? r : r & 3 | 8)).toString(16);
  });
  return uuid;
}

// --------------------------------------------------------------------------- 

function* _yield_() {
  if (arguments.length) {
    return yield arguments[0];
  } else {
    return yield;
  }
}


// --------------------------------------------------------------------------- 

var Machine = function() {
  this.jobs = [];
  this.active = false;
  this.events = {};
}


Machine.prototype.isActive = function() {
  return this.active;
};

Machine.prototype.hasJobs = function() {
  return this.jobs.length > 0;
};

Machine.prototype.addCoroutine = function(fn, args) {
  var uuid = generateUUID();
  args = args !== undefined ? args : [];
  var generator = fn.apply(null, args);
  var coroutine = {
    uuid: uuid,
    generator: generator
  };
  //this.coroutines[uuid] = coroutine;
  this.addJob([coroutine]);
  return coroutine;
//  return coroutine;
};

Machine.prototype.run = function() {
  this.active = true;
  while (this.jobs.length) {
    var job = this.jobs.shift();
    //var [coroutineId, args] = job; 
//    var coroutineId = job.shift();
    var coroutine = job.shift();
    var argument = job.shift(); 
 //   var coroutine = this.getCoroutine(coroutineId);
    var generatorValue = coroutine.generator.next(argument); 
    this.handle(coroutine, generatorValue);
  }
  this.active = false;
};


Machine.prototype.wakeup = function() {
  if (!this.active) {
    this.run();
  }
}

Machine.prototype.handle = function(coroutine, generatorValue) {
  //if (generatorValue.done) {
  //  // the coroutine is dead and needs to be cleaned up. 
  //  delete this.coroutines[coroutine.id];
  //  coroutine = null;
  //}

  var request = generatorValue.value;

  // if there is no request we abandon the routine? 
  if (!request) return;

  // we dispatch to some handler 
  var handler = request; //this.handlers[request.type];
  if (!handler) {
    // if we can find no handler should we throw an error? 
    return;
  }

  //handler.apply(this, [coroutine, request]);
  handler.apply(this, [coroutine]);
}

Machine.prototype.addJobs = function(newJobs) {
  this.jobs = this.jobs.concat(newJobs);
}

Machine.prototype.addJob = function(newJob) {
  this.jobs.push(newJob);
}

Machine.prototype.emit = function(address, value) {
  var addressString = address.join('/'); 
  var listeners = this.events[addressString] = this.events[addressString] || [];
  for (var i = 0; i < listeners.length;) {
    var listener = listeners[i];
    if (listener.once) {
      listener.callback(value);
      listeners.splice(i, 1);
    } else {
      listener.callback(value);
      i++;
    }
  }
  if (listeners.length == 0)
    delete this.events[addressString];
}

Machine.prototype.once = function(address, fn) {
  var addressString = address.join('/'); 
  this.events[addressString] = this.events[addressString] || [];
  this.events[addressString].push({ once: true, callback: fn });
}

Machine.prototype.onceAddJob = function(address, job) {
  var machine = this;
  this.once(address, function() {
    machine.addJob(job);
  });
}


Machine.prototype.onceAddJobApplyEvent = function(address, coroutine) {
  var machine = this;
  this.once(address, function(value) {
    machine.addJob([coroutine, value]);
  });
};


Machine.prototype.listenersCount = function(address) {
  var addressString = address.join('/'); 
  if (!this.events[addressString]) return 0;
  return this.events[addressString].length; 
}


// --------------------------------------------------------------------------- 

var Inbox = function(capacity) {
  this.capacity = capacity;
  this.messages = [];
  return;
};

Inbox.prototype.isFull = function() {
  if (this.capacity == -1) return false;
  else return this.messages.length >= this.capacity; 
};

Inbox.prototype.isEmpty = function() {
  return this.messages.length == 0;
};

Inbox.prototype.push = function(message) {
  this.messages.push(message);
};

Inbox.prototype.pop = function() {
  return this.messages.pop();
};

// --------------------------------------------------------------------------- 

/*
var EventEmitter = function() {
  this.events = { };
  return;
}

EventEmitter.prototype.listenersCount = function(eventName) {
  if (!this.events[eventName]) return 0;
  return this.events[eventName].length;  
}

*/


// Two-Way 2 End-point Channels                                                
// --------------------------------------------------------------------------- 
function makeDualChannel(capacity0, capacity1) {
  //options = options || {};
  //options.capacity = options.capacity || [];
  //options.capacity[0] = options.capacity[0] !== undefined ? options.capacity[0] : 0;
  //options.capacity[1] = options.capacity[1] !== undefined ? options.capacity[1] : 0;
  if (capacity1 === undefined) {
    capacity1 = capacity0 = capacity0 !== undefined ? capacity0 : 0;
  } else {
    capacity0 = capacity0 !== undefined ? capacity0 : 0;
    capacity1 = capacity1 !== undefined ? capacity1 : 0;
  }

  var uuid    = generateUUID();
  var channel = {};
  channel.uuid = uuid;
  channel.inboxes = [
    new Inbox(capacity0),
    new Inbox(capacity1)
  ];

 // channel.endpoints = [
 //   { channel: channel, side: 0, subscribers: []},
 //   { channel: channel, side: 1, subscribers: []}
 // ];

  return [
    { channel: channel, side: 0 },
    { channel: channel, side: 1 }
  ];
}

function* dualChannelWrite(channelReference, value, options) {
  options = options || {};
  var uuid = generateUUID();
  var evt = {
    uuid: uuid,
    type: 'dchwrite',
    sync: options.sync !== undefined ? options.sync : true,
    channelReference: channelReference,
    value: value
  };
  return yield* _yield_(function(coroutine) { return dualChannelWriteHandler.apply(this, [coroutine, evt]); });
}

function* dualChannelRead(channelReference, options) {
  options = options || {};
  var uuid = generateUUID();
  var evt = {
    uuid: uuid,
    type: 'dchread',
    sync: options.sync !== undefined ? options.sync : true,
    channelReference: channelReference
  };
  return yield* _yield_(function(coroutine) { return dualChannelReadHandler.apply(this, [coroutine, evt]); });
}




// owner is the coroutine doing the sending, if owner has died, pass null 
// the evt passed to the handler is the generatorValue.value 
function dualChannelWriteHandler(owner, evt) {
  var channelReference = evt.channelReference

  //var channelId = channelReference.uuid;
  //var channel = channels[channelId];
  var channel = channelReference.channel;

  var side = channelReference.side;
  var destinationSide = side ^ 1;
  // the destination is the other side/end. 
  var destinationInbox = channel.inboxes[destinationSide];

  var listenersAddress = [channel.uuid, destinationSide, 'message'];

  var message = {
    uuid: evt.uuid,
    value: evt.value
  };

  if (evt.sync) {
    // event is synchronous 
    if (this.listenersCount(listenersAddress)) { // callbacks exist. 
      // inform callbacks of message, by adding them to scheduler. 
      this.emit(listenersAddress, message.value);
      // tell owner true. maybe reschedule owner. 
      if (owner) this.addJob([owner, true]);
    } else if (destinationInbox.isFull()) { // buffer full
      // there are no callbacks
      // we push the message to the buffer anyways
      destinationInbox.push(message);
      // maybe we push an event subscription for the owner, for when our message is handled.
      if (owner) this.onceAddJob([message.uuid, 'popped'], [owner, true]);
    } else {
      // there are no callbacks and the buffer is not full
      // we push the message to the buffer 
      destinationInbox.push(message);
      // tell owner true. maybe reschedule owner. 
      if (owner) this.addJob([owner, true]);
    }
  } else {
    // event is asynchronous 
    if (this.listenersCount(listenersAddress)) {
      // tell owner true. maybe reschedule owner. 
      if (owner) this.addJob([owner, true]);
      // inform callbacks of message, by adding them to scheduler. 
      this.emit(listenersAddress, message.value);
    } else if (destinationInbox.isFull()) { // buffer full 
      // there are no callbacks
      // tell owner false. maybe reschedule owner. 
      if (owner) this.addJob([owner, false]);
    } else {
      // tell owner true. maybe reschedule owner. 
      if (owner) this.addJob([owner, true]);
      // bufer is not full, and there are no callbacks. 
      destinationInbox.push(message);
    }
  }
}


function dualChannelReadHandler(owner, evt) {
  var channelReference = evt.channelReference
  //var channelId = channelReference.uuid;
  //var channel = channels[channelId];
  var channel = channelReference.channel;
  var side = channelReference.side;
  var inbox = channel.inboxes[side];

  var listenersAddress = [channel.uuid, side, 'message'];

  if (evt.sync) {
    // event is synchronous 
    if (owner) this.onceAddJobApplyEvent(listenersAddress, owner);
    if (inbox.isEmpty()) {
      // there were no messages. 
      // we need to wait. 
    } else {
      // we have messages waiting... 
      // get the first one. 
      var message = inbox.pop();
      // send the messsage value to all receivers. 
      this.emit(listenersAddress, message.value);
      // message was popped, inform listeners. 
      this.emit([message.uuid, 'popped']);
    }
  } else {
    // event is asynchronous 
    if (inbox.isEmpty()) {
      // there are no messages. 
      // we return undefined. unable to read a message. 
      if (owner) this.addJob([owner, undefined]);
    } else {
      // we have messages waiting... 
      var message = inbox.pop();
      // we add owner to the events. 
      //eventManager.once(listenersAddress, [owner.uuid, true]);
      if (owner) this.addJob([owner, message.value]);
      // send the messsage value to all receivers. 
      this.emit(listenersAddress, message.value);
      // message was popped, inform message listeners. 
      this.emit([message.uuid, 'popped']);
    }
  }
}



// Semaphores                                                                  
// --------------------------------------------------------------------------- 
var Semaphore = function(n) {
  this.counter = n || 0;
}

Semaphore.prototype.put = function() {
  this.counter++;
}

Semaphore.prototype.take = function() {
  this.counter--;
  if (this.counter == 0) {
    callback();    
  }
}



// Latch                                                                       
// --------------------------------------------------------------------------- 
var Latch = function(callback) {
  this.counter = 0;
  this.callback = callback;
}

Latch.prototype.put = function() {
  this.counter++;
  if (this.counter == 0) {
    this.callback();    
  }
}

Latch.prototype.take = function() {
  this.counter--;
}






// One-way Sync Channels                                                       
// --------------------------------------------------------------------------- 

function makeSingleSyncChannel() {
  var channel = { };
  channel.writers = [
    { channel: channel }
  ];

  channel.readers = [
    { channel: channel, inbox: new Inbox(0) }
  ];

  return [channel.readers[0], channel.writers[0]];
}

function* singleSyncChannelWrite(channelReference, value) {
  var evt = {
    channelReference: channelReference,
    value: value
  };
  return yield* _yield_(function(coroutine) { return singleSyncChannelWriteHandler.apply(this, [coroutine, evt]); });
}

function* singleSyncChannelRead(channelReference) {
  var evt = {
    channelReference: channelReference
  };
  return yield* _yield_(function(coroutine) { return singleSyncChannelReadHandler.apply(this, [coroutine, evt]); });
}

function duplicateInputPort(channelReference) {
  var channel = channelReference.channel;
  channel.readers.push({ channel: channel, inbox: new Inbox(0) });
}

function duplicateOutputPort(channelReference) {
  var channel = channelReference.channel;
  channel.writers.push({ channel: channel });
}



function singleSyncChannelWriteHandler(owner, evt) {
  var channelReference = evt.channelReference;
  var channel = channelReference.channel;
  var machine = this;

  channelReference.latch = new Latch(function() {
    delete channelReference['latch'];
    machine.addJob([owner]);
  });

  channelReference.latch.take();

  var msg = {
    callback: function() { channelReference.latch.put(); },
    value: evt.value
  }

  for (var i = 0; i < channel.readers.length; i++) {
    channelReference.latch.take();
    var reader = channel.readers[i];
    if (reader.callback) {
      reader.callback(msg);
    } else {
      reader.inbox.push(msg);
    }
  }

  channelReference.latch.put();
}

function singleSyncChannelReadHandler(owner, evt) {
  var channelReference = evt.channelReference;
  var channel = channelReference.channel;
  var machine = this;

  if (channelReference.inbox.isEmpty()) {
    channelReference.callback = function(msg) {
      delete channelReference['callback'];
      machine.addJob([owner, msg.value]);
      msg.callback();
    }
  } else {
    var msg = channelReference.inbox.pop();
    machine.addJob([owner, msg.value]);
    msg.callback();
  }
}

function singleSyncChannelReadRawHandler(owner, evt) {
  var channelReference = evt.channelReference;
  var channel = channelReference.channel;
  var machine = this;

  if (channelReference.inbox.isEmpty()) {
    channelReference.callback = function(msg) {
      delete channelReference['callback'];
      machine.addJob([owner, msg]);
    }
  } else {
    var msg = channelReference.inbox.pop();
    machine.addJob([owner, msg]);
  }
}



function* singleSyncChannelReadRaw(channelReference) {
  var evt = {
    channelReference: channelReference
  };
  return yield* _yield_(function(coroutine) { return singleSyncChannelReadRawHandler.apply(this, [coroutine, evt]); });
}

function singleSyncChannelLink(M, output, input) {
  M.addCoroutine(function*() {
    while (true) {
      yield* singleSyncChannelWrite(input, yield* singleSyncChannelRead(output));
    }
  });
}












// Timers                                                                      
// --------------------------------------------------------------------------- 

function* sleep(ms) {
  var uuid = generateUUID();
  var evt = {
    uuid: uuid,
    type: 'sleep',
    milliseconds: ms
  };
  return yield* _yield_(function(coroutine) { return sleepHandler.apply(this, [coroutine, evt]); });
}

function sleepHandler(owner, evt) {
  var machine = this;
  setTimeout(function() {
    machine.addJob([owner]);
    machine.wakeup();
  }, evt.milliseconds);
}

// WebSocket Channel                                                           
// --------------------------------------------------------------------------- 

function makeWebSocketChannel(M, address) {
  var [wschan, userchan] = makeDualChannel(-1);
  var ws = new WebSocket(address);

  // register consumer that sends messages through the ws. 
  ws.onopen = function() {
    M.addCoroutine(function*() {
      while (true) {
        var msg = yield* dualChannelRead(wschan);
        ws.send(msg);
      }
    });
    M.wakeup();
  };

  // reads from the ws, and sends to the user.
  ws.onmessage = function(evt) {
    M.addCoroutine(function*() {
      yield* dualChannelWrite(wschan, evt.data);
    });
    M.wakeup();
  };

  return userchan;
}

// Multi-endpoint Channel                                                      
// --------------------------------------------------------------------------- 
function channelTwoLink(M, chneg, chpos) {
  M.addCoroutine(function*() {
    while (true) {
      yield* dualChannelWrite(chpos, yield* dualChannelRead(chneg));
    }
  });
  M.addCoroutine(function*() {
    while (true) {
      yield* dualChannelWrite(chneg, yield* dualChannelRead(chpos));
    }
  });
}

function makeMultiChannel(M, n) {
  var uuid    = generateUUID();
  var internalEndpoints = [];
  var externalEndpoints = [];

  for (var i = 0; i < n; i++) {
    var [chneg, chpos] = makeDualChannel();
    internalEndpoints.push(chneg);
    externalEndpoints.push(chpos);
  }

  for (var i = 0; i < n; i++) {
    channelTwoLink(M, internalEndpoints[i], internalEndpoints[(i + 1) % n]);
  }

  return externalEndpoints;
}






// ATS Bindings                                                                
// --------------------------------------------------------------------------- 
var M = new Machine();

// --------------------------------------------------------------------------- 
function _ats2keh_ch1make() {
  return makeSingleSyncChannel();
}

function* _ats2keh_ch1send_kehyield_(channelReference, value) {
  return yield* singleSyncChannelWrite(channelReference, value);
}

function* _ats2keh_ch1recv_kehyield_(channelReference) {
  return yield* singleSyncChannelRead(channelReference);
}

function _ats2keh_ch1close(channelReference) {
  return;
}

function _ats2keh_ch1link(input, output) {
  return singleSyncChannelLink(M, input, output);
}




// --------------------------------------------------------------------------- 


function _ats2keh_makeWebSocketChannel(address) {
  return makeWebSocketChannel(M, address);
}

function _ats2keh_makeDualChannel(capacity0, capacity1) {
  return makeDualChannel(capacity0, capacity1);
}

function _ats2keh_addCoroutine(fn, args) {
  return M.addCoroutine(fn, args);
}

function* _ats2keh_sleep_kehyield_(ms) {
  return yield* sleep(ms);
}

function* _ats2keh_dualChannelWrite_kehyield_(channelReference, value, options) {
  return yield* dualChannelWrite(channelReference, value, options);
}

function* _ats2keh_dualChannelRead_kehyield_(channelReference, options) {
  return yield* dualChannelRead(channelReference, options);
}

function _ats2keh_dualChannelClose(channelReference) {
  return;
}

function _ats2keh_channelTwoLink(channelReference0, channelReference1) {
  return channelTwoLink(M, channelReference0, channelReference1);
}

function _ats2keh_makeMultiChannel(n) {
  return makeMultiChannel(M, n);
}


var _ats2keh_kehyield_ = _yield_;








/*



 
var ws = _ats2keh_makeWebSocketChannel('ws://localhost:5000/');

M.addCoroutine(function*() {
  yield* sleep(5000);
  yield* dualChannelWrite(ws, 12);
  yield* dualChannelWrite(ws, 18);
  var result = yield* dualChannelRead(ws);
  alert(result);
});





var [cha, chb] = makeDualChannel();


M.addCoroutine(function*() {
  while (true) {
    var n = Math.random() * 100000;
    yield* dualChannelWrite(chb, n.toLocaleString());
    yield* sleep(1000);
  }
});

M.addCoroutine(function*() {
  for (var i = 0; i < 10; i++) {
    var msg = yield* dualChannelRead(cha);
    console.log('got ' + i + ' ' + msg);
  }
});

M.addCoroutine(function*() {
  for (var i = 0; i < 10; i++) {
    console.log('HELLO ' + i);
    yield* sleep(2000);
  }
});

M.run();

*/




