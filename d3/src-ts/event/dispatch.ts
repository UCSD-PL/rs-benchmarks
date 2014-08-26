/// <reference path="../../d3.d.ts" />
/// <reference path="../arrays/map.ts" />

d3.dispatch = function(...types: string[]) :D3.Dispatch{
  var dispatch:D3.Dispatch= new d3_dispatch,
      i:number = -1,
      n:number = arguments.length;
  while (++i < n) dispatch[arguments[i]] =d3_dispatch_event(dispatch);
  return dispatch;
};

function d3_dispatch() :void{}

d3_dispatch.prototype.on = function(type:string, listener?:any) :any{
  var i:number = type.indexOf("."),
      name:string = "";

  // Extract optional namespace, e.g., "click.foo"
  if (i >= 0) {
    name= type.substring(i + 1);
    type = type.substring(0, i);
  }

  if (type) return arguments.length < 2
      ? this[type].on(name)
      : this[type].on(name, listener);

  if (arguments.length === 2) {
    if (listener == null) for (type in this) {
      if (this.hasOwnProperty(type)) this[type].on(name, null);
    }
    return this;
  }
};

function d3_dispatch_event(dispatch:D3.Dispatch) :()=>D3.Dispatch{
  var listeners:any[]= [],
      listenerByName:D3.Map= new d3_Map;

  function event():D3.Dispatch{
    var z :any[]= listeners, // defensive reference
        i = -1,
        n = z.length,
        l:any;
    while (++i < n) if (l = z[i].on) l.apply(this, arguments);
    return dispatch;
  }

  event.on = function(name:string, listener:any) :D3.Dispatch{
    var l:any = listenerByName.get(name),
        i:any;

    // return the current listener, if any
    if (arguments.length < 2) return l && l.on;

    // remove the old listener, if any (with copy-on-write)
    if (l) {
      l.on = null;
      listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1));
      listenerByName.remove(name);
    }

    // add the new listener, if any
    if (listener) listeners.push(listenerByName.set(name, {on: listener}));

    return dispatch;
  };

  return event;
}
