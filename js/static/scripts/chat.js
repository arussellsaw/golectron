import React, {Component} from 'react';
import Message from './message';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.eventHandler = this.eventHandler.bind(this);
    this.setState = this.setState.bind(this);
    this.state = {
      activeChan: "general",
      messages: [],
    }
    props.router.subscribe("chat", {}, this.eventHandler);
  }

  render() {
    return (
      <div className="main-chat">
      <h3>{this.state.activeChan}</h3>
        {
          this.state.messages.map(function(message, i) {
            return <Message key={i} {...{message:message}}/>
          })
        }
      </div>
    )
  }

  eventHandler(evnt) {
    this.setState(function(prevState, props) {
      console.log(prevState)
      return {messages: prevState.messages.concat([evnt])}
    });
  }
}
