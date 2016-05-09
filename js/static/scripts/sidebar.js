import React, {Component} from 'react';

export default class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.eventHandler = this.eventHandler.bind(this)
    this.setState = this.setState.bind(this)
    this.state = {
      title: "placeholder",
      users: [],
      channels: ["empty"]
    };
    props.router.subscribe("sidebar", {}, this.eventHandler);
  }

  render() {
    return (
      <div className="sidebar">
      <h2>{this.state.title}</h2>
      {this.state.channels.map(function(channel, i) {
        return <div key={i}>{channel}</div>
      })}
      <h2>Users</h2>
      {this.state.users.map(function(user, i) {
        return <div key={i}>{user.user_name}</div>
      })}
      </div>
    )
  }

  eventHandler(evnt) {
    console.log(evnt);
    this.setState(evnt);
  }
}
