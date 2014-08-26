/// <reference path="../../d3.d.ts" />
/// <reference path="../core/document.ts" />
/// <reference path="../core/vendor.ts" />

var d3_timer_queueHead:{c:any;t:number;f:boolean; n:any;},
    d3_timer_queueTail:{c:any;t:number;f:boolean; n:any;},
    d3_timer_interval:number, // is an interval (or frame) active?
    d3_timer_timeout:number, // is a timeout active?
    d3_timer_active:{c:any;t:number;f:boolean; n:any;}, // active timer object
    d3_timer_frame :(c:any)=>void= d3_window[d3_vendorSymbol(d3_window, "requestAnimationFrame")] || function(callback) { setTimeout(callback, 17); };

// The timer will continue to fire until callback returns true.
d3.timer = function(callback:any, delay?:number, then?:number) {
  var n = arguments.length;
  if (n < 2) delay = 0;
  if (n < 3) then = Date.now();

  // Add the callback to the tail of the queue.
  var time = then + delay, 
  timer:{c:any;t:number;f:boolean; n:any;}= {c: callback, t: time, f: false, n: null};
  if (d3_timer_queueTail) d3_timer_queueTail.n = timer;
  else d3_timer_queueHead = timer;
  d3_timer_queueTail = timer;

  // Start animatin'!
  if (!d3_timer_interval) {
    d3_timer_timeout = clearTimeout(d3_timer_timeout);
    d3_timer_interval = 1;
    d3_timer_frame(d3_timer_step);
  }
};

function d3_timer_step() :void{
  var now :number= d3_timer_mark(),
      delay:number = d3_timer_sweep() - now;
  if (delay > 24) {
    if (isFinite(delay)) {
      clearTimeout(d3_timer_timeout);
      d3_timer_timeout = setTimeout(d3_timer_step, delay);
    }
    d3_timer_interval = 0;
  } else {
    d3_timer_interval = 1;
    d3_timer_frame(d3_timer_step);
  }
}

d3.timer.flush = function() :void{
  d3_timer_mark();
  d3_timer_sweep();
};

function d3_timer_mark() :number{
  var now = Date.now();
  d3_timer_active = d3_timer_queueHead;
  while (d3_timer_active) {
    if (now >= d3_timer_active.t) d3_timer_active.f = d3_timer_active.c(now - d3_timer_active.t);
    d3_timer_active = d3_timer_active.n;
  }
  return now;
}

// Flush after callbacks to avoid concurrent queue modification.
// Returns the time of the earliest active timer, post-sweep.
function d3_timer_sweep() :number{
  var t0:{c:any;t:number;f:boolean; n:any;},
      t1:{c:any;t:number;f:boolean; n:any;} = d3_timer_queueHead,
      time:number = Infinity;
  while (t1) {
    if (t1.f) {
      t1 = t0 ? t0.n = t1.n : d3_timer_queueHead = t1.n;
    } else {
      if (t1.t < time) time = t1.t;
      t1 = (t0 = t1).n;
    }
  }
  d3_timer_queueTail = t0;
  return time;
}
