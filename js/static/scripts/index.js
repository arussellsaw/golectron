import React from 'react';
import {render} from 'react-dom';
import App from './App';
import router from './lib/router';

require("!style!css!less!./less/main.less");

var rt = new router("ws://localhost:5000/ws");

var props = {}
props.router = rt;

render(
  <App {...props} />,
  document.getElementById('root')
);
