import React from 'react';
import {hot} from 'react-hot-loader';
import GridLayout from 'react-grid-layout';
import moment from 'moment';
import 'moment/locale/de';

import {Calendar} from './components/Calendar';
import {FileUpload} from './components/FileUpload';
import {Console} from './components/Console';
import {DataTable} from './components/DataTable';
import {Placeholder} from './components/Placeholder';
import * as timedata from './logic/TimeData';


import 'react-grid-layout/css/styles.css';
import {FaDatabase} from 'react-icons/fa';
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

    super(props);

    moment.locale('de');

    this.log = this.log.bind(this);
    this.setFile = this.setFile.bind(this);
    this.clearFile = this.clearFile.bind(this);

    this.state = {
      console: '',
      timeData: new timedata.TimeData(),
      file: []
    };
  }

  log(text) {
    this.setState((state) => ({console: `${state.console}${text}\n`}));
  }

  setFile(file) {

    this.app = this;

    const fileName = file.file.name;

    this.app.log(`Lese Datei ${fileName}...`);

    timedata.fromFile(file.file, this.app.log).then(timeData => {

      this.app.log(`Datei ${fileName} erfolgreich gelesen, ${timeData.getEntries().length} Einträge übernommen.`);
      this.app.setState({
        file: file,
        timeData: timeData
      });

    }, reason => {

      this.app.log(reason);
      this.app.log(`Fehler beim Lesen der Datei ${fileName}.`);
      this.app.clearFile();
    });

  }

  clearFile() {
    this.setState({
      file: [],
      timeData: new timedata.TimeData()
    });
  }

  render() {

    const dataTable = <DataTable timeData={this.state.timeData}/>;
    const calendar = <Calendar log={this.log} timeData={this.state.timeData}/>;
    const fileUpload = <FileUpload setFile={this.setFile} clearFile={this.clearFile}/>;
    const console = <Console value={this.state.console}/>;

    return (
      <div className="main">
        <div className="main">
          <GridLayout layout={layout} cols={6} rowHeight={100} width={1000} autoSize={true}>
            <div key="dataTable">
              {this.getComponent(dataTable, 'Tabelle')}
            </div>
            <div key="calendar">
              {this.getComponent(calendar, 'Kalender')}
            </div>
            <div key="fileUpload">
              {fileUpload}
            </div>
            <div key="console">
              {console}
            </div>
          </GridLayout>
        </div>
      </div>
    );
  }

  hasTimeData() {
    return this.state.timeData.hasEntries();
  }

  getComponent(component, name) {

    const placeholder =
      <Placeholder
        name={name}
        icon={<FaDatabase/>}
        text={'keine Daten'}
      />;

    return this.hasTimeData() ? component : placeholder;
  }
}

export default hot(module)(App);
