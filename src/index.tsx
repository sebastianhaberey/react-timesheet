import React, { StrictMode } from "react";
import App from './App';
import * as ReactDOMCllient from 'react-dom/client';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const routing = (
    <Router>
        <div>
            <Route path="/" exact component={App} />
            <Route path="/:id" component={App} />
        </div>
    </Router>
);


const container = document.getElementById('root');
if (container) {
  const root = ReactDOMCllient.createRoot(container);
  root.render(routing);
} else {
  throw new Error('Could not find root container');
}
