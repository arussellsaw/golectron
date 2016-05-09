import React, {Component} from 'react';
import uuid from 'uuid';

export default class Button extends Component {
  constructor(props) {
    super(props)
    this.eventHandler = this.eventHandler.bind(this)
    props.router.subscribe("testingid", {}, this.eventHandler);
  }

  render() {
    return (
      <a className="top-button" onClick={this.click}>{this.cntent}</a>
    )
  }

  click() {
    console.log("clicked home");
  }

  eventHandler(evnt) {
    this.cntent = evnt.value;
    this.forceUpdate();
  }
}
