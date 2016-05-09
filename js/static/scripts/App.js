import React, {Component} from 'react';
import Sidebar from './sidebar';
import Chat from './chat';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.router = props.router;
  }

  render() {
    var props = {};
    props.router = this.router;
    return (
      <div className="container">
        <Sidebar {...props}/>
        <Chat {...props}/>
      </div>
    );
  }
}
