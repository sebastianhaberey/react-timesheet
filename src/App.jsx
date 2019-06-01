import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import './App.css';
import Calendar from './components/Calendar';

class App extends Component {
  render() {
    return (
        <div className="App">
          <main>
            <Calendar/>
          </main>
        </div>
    );
  }
}

export default hot(module)(App);
