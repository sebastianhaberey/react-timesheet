import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import GridLayout from 'react-grid-layout';
import {Calendar} from './components/Calendar';
import {FileUpload} from './components/FileUpload';
import {Console} from './components/Console';
import {DataTable} from './components/DataTable';
import {extractTimeData, parse} from './logic/Csv';
import {NoData} from './components/NoData';

import moment from 'moment';
import 'moment/locale/de';

import 'react-grid-layout/css/styles.css';
import './App.css';

/* @formatter:off */
  const layout = [
    { i: 'dataTable', x: 0, y: 0, w: 2, h: 5, isResizable: false },
    { i: 'calendar', x: 2, y: 0, w: 4, h: 5, isResizable: false },
    { i: 'fileUpload', x: 0, y: 5, w: 6, h: 1, isResizable: false },
    { i: 'console', x: 0, y: 6, w: 6, h: 2, isResizable: false },
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
      console: '',
      data: [],
      file: [],
    };
  }

  log(text) {
    this.setState((state, props) => {
      return {console: `${state.console}${text}\n`};
    });
  }

  setFile(file) {

    this.app = this;

    parse(file.file).then((result) => {

      try {

        const data = extractTimeData(result.data, this.app.log.bind(this));

        this.app.log(`Datei erfolgreich gelesen, ${data.length} Einträge übernommen.`);
        this.app.setState({
          file: file,
          data: data,
        });

      } catch (e) {

        this.app.log(e);
        this.app.setState({
          file: [],
          data: [],
        });
      }
    });

  }

  clearFile() {
    this.setState({
      console: '',
      file: [],
      data: [],
    });
    this.clearLog();
  }

  render() {

    return (
      <div className="main">
        <div className="main">
          <GridLayout layout={layout} cols={6} rowHeight={100} width={1000} autoSize={true}>
            <div key="calendar">
              {this.getComponentIfData(<Calendar data={this.state.data}/>)}
            </div>
            <div key="fileUpload">
              <FileUpload log={this.log} setFile={this.setFile} clearFile={this.clearFile}/>
            </div>
            <div key="console">
              {this.getComponentIfData(<Console value={this.state.console}/>)}
            </div>
            <div key="dataTable">
              {this.getComponentIfData(<DataTable data={this.state.data}/>)}
            </div>
          </GridLayout>
        </div>
      </div>
    );
  }

  hasData() {
    return this.state.data && this.state.data.length;
  }

  getComponentIfData(component) {
    return this.hasData() ? component : <NoData/>;
  }
}

export default hot(module)(App);
