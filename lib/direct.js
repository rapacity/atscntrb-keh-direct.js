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
/*
function exec(job) {
  var coroutine = job.shift();
  var argument = job.shift(); 
  var generatorValue = coroutine.generator.next(argument); 
  var handler = generatorValue.value;
    
  if (handler) {
    handler.apply(this, [coroutine]);
  }
}

function spawn(fn, args) {
  args = args !== undefined ? args : [];
  var generator = fn.apply(null, args);
  var coroutine = {
    generator: generator
  };
  exec([coroutine]);
  return coroutine;
}
*/

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

Machine.prototype.addCoroutine = function(fn,args) {
  var uuid = generateUUID();
  args = args !== undefined ? args : [];
  var generator = fn.apply(null, args);
  var coroutine = {
    uuid: uuid,
    generator: function*() {
      yield* generator;
      coroutine.done = true;
      if (coroutine.callbacks) {
        for (var i = 0; i < coroutine.callbacks.length; i++) {
          coroutine.callbacks[i]();
        }
      }
    }(),
   // generator: generator,
    callbacks: [],
    done: false
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
    var coroutine = job.shift();
    var argument = job.shift(); 
    var generatorValue = coroutine.generator.next(argument); 
    this.handle(coroutine, generatorValue);
  }
  this.active = false;
};


Machine.prototype.wakeup = function() {
  if (!this.active) {
    this.run();
  }
};

Machine.prototype.handle = function(coroutine, generatorValue) {
  var handler = generatorValue.value;
  if (!handler) return;
  handler.apply(this, [coroutine]);

  //    console.log(coroutine)
  // if done, trigger done callback if present. 
  /*
  if (generatorValue.done) {
    coroutine.done = true;
    if (coroutine.callbacks) {
      for (var i = 0; i < coroutine.callbacks.length; i++) {
        coroutine.callbacks[i]();
      }
    }
  }
  */
};

Machine.prototype.addJobs = function(newJobs) {
  this.jobs = this.jobs.concat(newJobs);
};

Machine.prototype.addJob = function(newJob) {
  this.jobs.unshift(newJob);
};


Machine.prototype.addJobCallback = function(newJob) {
  this.addCoroutine(function*() { newJob(); });
  //this.jobs.unshift(());
};

Machine.prototype.addJobGenerator = function(newJob) {
  var uuid = generateUUID();
  var coroutine = {
    uuid: uuid,
    generator: function*() {
      yield* newJob;
      coroutine.done = true;
      if (coroutine.callbacks) {
        for (var i = 0; i < coroutine.callbacks.length; i++) {
          coroutine.callbacks[i]();
        }
      }
    }(),
    callbacks: [],
    done: false
  };
  this.addJob([coroutine]);
  return coroutine;
};


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




// Two-way Sync Channels                                                       
// --------------------------------------------------------------------------- 


function makeTwoWaySyncChannel() {
  var obj = { };

  var channels = [
    makeSingleSyncChannel(),
    makeSingleSyncChannel()
  ];
  
  obj.endpoints = [
    { channel: obj, input: channels[0][0], output: channels[1][1] },
    { channel: obj, input: channels[1][0], output: channels[0][1] }
  ];

  return obj.endpoints;
}

function* twoWaySyncChannelWrite(channelReference, value) {
  var evt = {
    channelReference: channelReference.output,
    //channelReference: channelReference,
    value: value
  };
  //return yield* _yield_(function(coroutine) { return twoWaySyncChannelWriteHandler.apply(this, [coroutine, evt]); });
  return yield* _yield_(function(coroutine) { return singleSyncChannelWriteHandler.apply(this, [coroutine, evt]); });
}

function* twoWaySyncChannelRead(channelReference) {
  var evt = {
    //channelReference: channelReference
    channelReference: channelReference.input
  };
  //return yield* _yield_(function(coroutine) { return twoWaySyncChannelReadHandler.apply(this, [coroutine, evt]); });
  return yield* _yield_(function(coroutine) { return singleSyncChannelReadHandler.apply(this, [coroutine, evt]); });
}

function _ats2keh_ch2make() {
  return makeTwoWaySyncChannel();
}

function* _ats2keh_ch2recv_kehyield_(ch) {
  return yield* twoWaySyncChannelRead(ch);
}

function* _ats2keh_ch2send_kehyield_(ch, v) {
  return yield* twoWaySyncChannelWrite(ch, v);
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

function _ats2keh_ch1indup(channelReference) {
  var channel = channelReference.channel;
  var duplicate = { channel: channel, inbox: new Inbox(0) };
  channel.readers.push(duplicate);
  return duplicate;
}

function _ats2keh_ch1outdup(channelReference) {
  var channel = channelReference.channel;
  var duplicate = { channel: channel };
  channel.writers.push(duplicate);
  return duplicate;
}



function _ats2keh_ch2dup(ch2endpt) {
  return  { input: _ats2keh_ch1indup(ch2endpt.input), output: _ats2keh_ch1outdup(ch2endpt.output) };
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
      machine.addJobCallback(function() { msg.callback(); });
    }
  } else {
    var msg = channelReference.inbox.pop();
    machine.addJob([owner, msg.value]);
    machine.addJobCallback(function() { msg.callback(); });
  }
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
  var [wschan, userchan] = makeTwoWaySyncChannel();
  var ws = new WebSocket(address);

  // register consumer that sends messages through the ws. 
  ws.onopen = function() {
    M.addCoroutine(function*() {
      while (true) {
        var msg = yield* twoWaySyncChannelRead(wschan);
        ws.send(msg);
      }
    });
    M.wakeup();
  };

  // reads from the ws, and sends to the user.
  ws.onmessage = function(evt) {
    M.addCoroutine(function*() {
      yield* twoWaySyncChannelWrite(wschan, evt.data);
    });
    M.wakeup();
  };

  return userchan;
}

// Multi-endpoint Channel                                                      
// --------------------------------------------------------------------------- 
/*
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
*/





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



function _ats2keh_ch1inclose(channelReference) {
  var channel = channelReference.channel;
  var index = channel.readers.indexOf(channelReference);
  if (index > -1) {
    channel.readers.splice(index, 1);
  }

  return;
}



function _ats2keh_ch1outclose(channelReference) {
  var channel = channelReference.channel;
  var index = channel.readers.indexOf(channelReference);
  if (index > -1) {
    channel.readers.splice(index, 1);
  }

  return;
}

function _ats2keh_ch1link(input, output) {
  return singleSyncChannelLink(M, input, output);
}




// --------------------------------------------------------------------------- 

function applyClosure(closure) {
  var fn   = closure[0];
  var args = closure;
  return fn.apply(this, [args]);
}

function evalClosure(closure) {
  var fn   = closure[0];
  var args = closure;
  //var args = [closure];
  //return function() { return fn.apply(this, args); };
  return function() { return fn(args); };
}



// --------------------------------------------------------------------------- 

function _ats2keh_makeWebSocketChannel(address) {
  return makeWebSocketChannel(M, address);
}

function _ats2keh_makeDualChannel(capacity0, capacity1) {
  return makeDualChannel(capacity0, capacity1);
}

function _ats2keh_addCoroutine(fn, args) {
  args = args || [];
  if (fn.constructor.name == 'GeneratorFunction') {
    return M.addCoroutine(fn, args);
  } else {
    return M.addJobCallback(function() {
      fn.apply(this, args);
    });
  }
}


function _ats2keh_go_cloptr1(fn) {
  var x = applyClosure(fn);
  return M.addJobGenerator(x);
}





function* _ats2keh_sleep_kehyield_(ms) {
  return yield* sleep(ms);
}


function _ats2keh_ch2link(ch0, ch1) {
 _ats2keh_ch1link(ch1.input, ch0.output);
 _ats2keh_ch1link(ch0.input, ch1.output);
 // ch1link(M, ch0.output, ch1.input); 
 // ch1link(M, ch1.output, ch0.input); 
}

function _ats2keh_ch2close(channelReference) {
  _ats2keh_ch1inclose(channelReference.input);
  _ats2keh_ch1outclose(channelReference.output);
  return;
}


function _ats2keh_ch2split(ch2endpt) {
  return [ch2endpt.input, ch2endpt.output];
}


function _ats2keh_wakeup() {
  setTimeout(function() { M.wakeup(); }, 0);
}


var _ats2keh_kehyield_ = _yield_;



function* _ats2keh_sync_kehyield_() {
  var coroutines = arguments;
  var [cin, cout] = _ats2keh_ch1make();
  var count = coroutines.length;
  var done = false;
  var n = 0;
  for (var i = 0; i < coroutines.length; i++) {
    if (coroutines[i].done) {
      n++;
    } else {
      coroutines[i].callbacks.push(function() {
        M.addCoroutine(function*() {
          n++;
          if (n == count && !done) {
            done = true;
            yield* _ats2keh_ch1send_kehyield_(cout, true);  
          }
        });
      });
    }
  }
  return yield* _ats2keh_ch1recv_kehyield_(cin);
}

// --------------------------------------------------------------------------- 

function* make_chr() {
  var uuid = generateUUID();
  var chr = { };
  chr.uuid = uuid;
  chr.inputs  = [];
  chr.outputs = [];
  return chr;  
}


/*
function* make_chr_ch2(chr) {
  var uuid = generateUUID();
  //var ch2 = _ats2keh_ch2make();
  var [endptS, endptMS] = _ats2keh_ch2make();
  var [endptU, endptMU] = _ats2keh_ch2make();

  // Switchboard -> User 
  M.addCoroutine(function*() {
    while (true) {
      var msg = yield* _ats2keh_ch2recv_kehyield_(endptMS);
      yield* _ats2keh_ch2send_kehyield_(endptMU, msg.value);
    }
  });

  // User -> Switchboard 
  M.addCoroutine(function*() {
    while (true) {
      var value = yield* _ats2keh_ch2recv_kehyield_(endptMU);
      var msg = {
        destination:
      };
      yield* _ats2keh_ch2send_kehyield_(endptMS, msg.value);
    }
  });



  var res = {
    uuid: uuid,
    input: endptA0.input,
    output: endptA0.output
    //channel: ch2
  };


  chr.channels[uuid] = res;

}




function chr_add_ch1in_route(chr, ch1in) {
  // FIXME handle removal of ch1in. 
  chr.inputs.push(ch1in);
  M.addCoroutine(function*() {
    var msg   = yield* _ats2keh_ch1recv_kehyield_(ch1in);
    var addr  = msg.destination.shift();
    var value = msg.value;

    var chan  = chr.channels[addr];
    yield* _ats2keh_ch1send_kehyield_(chan.output, msg);
    //chan.input
    //chan.output

    //yield* _ats2keh_ch1send_kehyield_(ch1in);
  });
}

function chr_send(chan, value) {
  var msg = {
    destination: ??,
    value: value
  }
  
}


function* chr_read(chan) {
  var msg = yield* _ats2keh_ch1recv_kehyield_(ch1in);
  return msg.value;
}


*/





// --------------------------------------------------------------------------- 


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




