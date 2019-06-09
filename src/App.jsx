import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import '../node_modules/react-grid-layout/css/styles.css';
import './App.css';
import Calendar from './components/Calendar';
import GridLayout from 'react-grid-layout';

class App extends Component {

  render() {

    const layout = [
      {
        i: 'a',
        x: 0,
        y: 0,
        w: 3,
        h: 4,
        isResizable: false
      },
      {
        i: 'b',
        x: 3,
        y: 0,
        w: 3,
        h: 2,
        isResizable: false
      },
      {
        i: 'c',
        x: 3,
        y: 3,
        w: 2,
        h: 2,
        isResizable: false
      },
      {
        i: 'd',
        x: 6,
        y: 0,
        w: 1,
        h: 2,
        isResizable: false
      }
    ];

    return (
      <div className="main">
        <GridLayout layout={layout} cols={6} rowHeight={100} width={1200} autoSize={true}>
          <div key="a">
            <Calendar/>
          </div>
          <div key="b">
            <div className="panel">
            </div>
          </div>
          <div key="c">
            <div className="panel">
            </div>
          </div>
          <div key="d">
            <div className="panel">
            </div>
          </div>
        </GridLayout>
      </div>
    );
  }
}

export default hot(module)(App);
