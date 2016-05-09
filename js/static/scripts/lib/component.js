import React, {Component} from 'react';
import uuid from 'uuid';

export default class WiredComponent extends Component {
  constructor(props) {
    super(props);
    this.eventHandler = this.eventHandler.bind(this);
    props.router.subscribe(uuid.v1(), {},this.eventHandler);
  }

  getName() {
    return "wired_component";
  }

  eventHandler(evnt) {
    log.Debugf(evnt);
  }
}
