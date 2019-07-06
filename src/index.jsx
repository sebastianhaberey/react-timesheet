import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const routing = (
  <Router>
    <div>
      <Route path="/" exact component={App}/>
      <Route path="/:id" component={App}/>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));