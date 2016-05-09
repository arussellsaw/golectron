export default class Router {
  constructor(url) {
    this.subscriptions = {};
    this.ready = false;
    this.sck = new WebSocket(url);
    this.routeMessage = this.routeMessage.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.sck.onmessage = this.routeMessage;
    this.sck.onready = function() {
      console.log("ready")
    };
    window.onbeforeunload = function() {
      this.sck.close();
    };
  }

  routeMessage(evnt) {
    var payload = JSON.parse(evnt.data);
    if (!payload.route) {
      console.log("no route")
      return
    }
    if (this.subscriptions[payload.route]) {
      this.subscriptions[payload.route](payload);
    } else {
      console.log("could not route message for id "+payload.route)
      console.log(payload)
    }
  }

  subscribe(route, info, handler) {
    console.log(route)
    this.subscriptions[route] = handler;
  }
}
