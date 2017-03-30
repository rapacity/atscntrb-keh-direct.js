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
  this.coroutines = {};
  this.handlers = {};
  this.events = {};
}

Machine.prototype.register = function(type, fn) {
  this.handlers[type] = fn;
}

Machine.prototype.isActive = function() {
  return this.active;
};

Machine.prototype.hasJobs = function() {
  return this.jobs.length > 0;
};

Machine.prototype.getCoroutine = function(coroutineId) {
  return this.coroutines[coroutineId];
}

Machine.prototype.addCoroutine = function(fn, args) {
  var uuid = generateUUID();
  args = args !== undefined ? args : [];
  var generator = fn.apply(null, args);
  var coroutine = {
    uuid: uuid,
    generator: generator
  };
  this.coroutines[uuid] = coroutine;
  this.addJob([coroutine.uuid]);
  return coroutine.uuid;
//  return coroutine;
};

Machine.prototype.run = function() {
  this.active = true;
  while (this.jobs.length) {
    var job = this.jobs.shift();
    //var [coroutineId, args] = job; 
    var coroutineId = job.shift();
    var argument = job.shift(); 
    var coroutine = this.getCoroutine(coroutineId);
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
  var handler = this.handlers[request.type];
  if (!handler) {
    // if we can find no handler should we throw an error? 
    return;
  }

  handler.apply(this, [coroutine, request]);
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


Machine.prototype.onceAddJobApplyEvent = function(address, coroutineId) {
  var machine = this;
  this.once(address, function(value) {
    machine.addJob([coroutineId, value]);
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

var channels = {};

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

  var uuid = generateUUID();
  channels[uuid] = {};
  channels[uuid].uuid = uuid;
  channels[uuid].inboxes = [
    new Inbox(capacity0),
    new Inbox(capacity1)
  ];
  return [
    { uuid: uuid, side: 0 },
    { uuid: uuid, side: 1 }
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
  return yield* _yield_(evt);
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
  return yield* _yield_(evt);
}




// owner is the coroutine doing the sending, if owner has died, pass null 
// the evt passed to the handler is the generatorValue.value 
function dualChannelWriteHandler(owner, evt) {
  var channelReference = evt.channelReference
  var channelId = channelReference.uuid;
  var channel = channels[channelId];
  var side = channelReference.side;
  var destinationSide = side ^ 1;
  // the destination is the other side/end. 
  var destinationInbox = channel.inboxes[destinationSide];

  var listenersAddress = [channelId, destinationSide, 'message'];

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
      if (owner) this.addJob([owner.uuid, true]);
    } else if (destinationInbox.isFull()) { // buffer full
      // there are no callbacks
      // we push the message to the buffer anyways
      destinationInbox.push(message);
      // maybe we push an event subscription for the owner, for when our message is handled.
      if (owner) this.onceAddJob([message.uuid, 'popped'], [owner.uuid, true]);
    } else {
      // there are no callbacks and the buffer is not full
      // we push the message to the buffer 
      destinationInbox.push(message);
      // tell owner true. maybe reschedule owner. 
      if (owner) this.addJob([owner.uuid, true]);
    }
  } else {
    // event is asynchronous 
    if (this.listenersCount(listenersAddress)) {
      // tell owner true. maybe reschedule owner. 
      if (owner) this.addJob([owner.uuid, true]);
      // inform callbacks of message, by adding them to scheduler. 
      this.emit(listenersAddress, message.value);
    } else if (destinationInbox.isFull()) { // buffer full 
      // there are no callbacks
      // tell owner false. maybe reschedule owner. 
      if (owner) this.addJob([owner.uuid, false]);
    } else {
      // tell owner true. maybe reschedule owner. 
      if (owner) this.addJob([owner.uuid, true]);
      // bufer is not full, and there are no callbacks. 
      destinationInbox.push(message);
    }
  }
}


function dualChannelReadHandler(owner, evt) {
  var channelReference = evt.channelReference
  var channelId = channelReference.uuid;
  var channel = channels[channelId];
  var side = channelReference.side;
  var inbox = channel.inboxes[side];

  var listenersAddress = [channelId, side, 'message'];

  if (evt.sync) {
    // event is synchronous 
    if (owner) this.onceAddJobApplyEvent(listenersAddress, owner.uuid);
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
      if (owner) this.addJob([owner.uuid, undefined]);
    } else {
      // we have messages waiting... 
      var message = inbox.pop();
      // we add owner to the events. 
      //eventManager.once(listenersAddress, [owner.uuid, true]);
      if (owner) this.addJob([owner.uuid, message.value]);
      // send the messsage value to all receivers. 
      this.emit(listenersAddress, message.value);
      // message was popped, inform message listeners. 
      this.emit([message.uuid, 'popped']);
    }
  }
}

// --------------------------------------------------------------------------- 

function* sleep(ms) {
  var uuid = generateUUID();
  var evt = {
    uuid: uuid,
    type: 'sleep',
    milliseconds: ms
  };
  return yield* _yield_(evt);
}

function sleepHandler(owner, evt) {
  var machine = this;
  setTimeout(function() {
    machine.addJob([owner.uuid]);
    machine.wakeup();
  }, evt.milliseconds);
}


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

// --------------------------------------------------------------------------- 


var M = new Machine();
M.register('dchwrite', dualChannelWriteHandler);
M.register('dchread', dualChannelReadHandler);
M.register('sleep', sleepHandler);

// ATS Bindings                                                                
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




