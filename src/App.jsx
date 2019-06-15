import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import GridLayout from 'react-grid-layout';
import Calendar from './components/Calendar';
import {FileUpload} from './components/FileUpload';
import {Console} from './components/Console';
import * as moment from 'moment';
import 'moment/locale/de';

import 'react-grid-layout/css/styles.css';
import './App.css';

/* @formatter:off */
  const layout = [
    { i: 'calendar', x: 0, y: 0, w: 4, h: 4, isResizable: false },
    { i: 'fileUpload', x: 4, y: 0, w: 2, h: 2, isResizable: false },
    { i: 'console', x: 0, y: 4, w: 6, h: 2, isResizable: false },
    { i: 'd', x: 4, y: 2, w: 2, h: 2, isResizable: false },
  ];
  /* @formatter:on */

class App extends React.Component {

  constructor(props) {

    moment.locale('de');

    super(props);
    this.log = this.log.bind(this);
    this.setFile = this.setFile.bind(this);
    this.clearFile = this.clearFile.bind(this);
    this.state = {
      console: ''
    };
  }

  log(text) {
    this.setState((state, props) => {
      return {console: `${state.console}${moment().format("L LTS SSS")}: ${text}\n`};
    });
  }

  setFile(file) {
    this.setState({ file: file });

    const reader = new FileReader();
    reader.addEventListener("loadend", function() {
      this.log(`Inhalt: ${reader.result}`);
    }.bind(this));
    reader.readAsText(file.file, 'utf-8');
    this.log(`Datei gesetzt: ${file.filename}`);
  }

  clearFile() {
    this.setState({file: undefined});
    this.log(`Datei entfernt.`);
  }

  render() {

    return (
      <div className="main">
        <div className="main">
          <GridLayout layout={layout} cols={6} rowHeight={100} width={1000} autoSize={true}>
            <div key="calendar">
              <Calendar/>
            </div>
            <div key="fileUpload">
              <FileUpload log={this.log} setFile={this.setFile} clearFile={this.clearFile}/>
            </div>
            <div key="console">
              <Console value={this.state.console}/>
            </div>
            <div key="d">
              <div className="panel">
              </div>
            </div>
          </GridLayout>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);
