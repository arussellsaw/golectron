import React, {Component} from 'react';

export default class Message extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message:props.message
    }
  }

  render() {
    return (
      <div className="chat-message">
        <div className="username">
          {this.state.message.user_name}
        </div>
        <div className="msg-content">
          {this.state.message.content}
        </div>
      </div>
    )
  }
}
