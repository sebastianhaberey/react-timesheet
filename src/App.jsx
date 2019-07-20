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
import {Heading} from './components/Heading';
import {Signature} from './components/Signature';

import * as timedata from './logic/TimeData';

import 'react-grid-layout/css/styles.css';
import {FaDatabase} from 'react-icons/fa';
import './App.css';

/* @formatter:off */
  const layout = [
    { i: 'heading', x: 0, y: 0, w: 6, h: 1, isResizable: false },
    { i: 'calendar', x: 0, y: 1, w: 4, h: 5, isResizable: false },
    { i: 'datatable', x: 4, y: 1, w: 2, h: 5, isResizable: false },
    { i: 'signature-1', x: 0, y: 6, w: 3, h: 1, isResizable: false },
    { i: 'signature-2', x: 3, y: 6, w: 3, h: 1, isResizable: false },
    { i: 'fileupload', x: 0, y: 7, w: 6, h: 1, isResizable: false },
    { i: 'console', x: 0, y: 8, w: 6, h: 2, isResizable: false },
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
      file: [],
      dev: this.getUrlParam('dev') === 'true'
    };
  }

  log(text) {
    this.setState((state) => ({console: `${state.console}${text}\n`}));
  }

  getUrlParam(paramName) {
    return new URLSearchParams(this.props.location.search).get(paramName);
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

    const components = [];

    components.push(this.getHeading());
    components.push(this.getCalendar());
    components.push(this.getDataTable());
    components.push(this.getSignature('1'));
    components.push(this.getSignature('2'));
    components.push(this.getFileUpload());

    if (this.state.dev) {
      components.push(this.getConsole());
    }

    return (
      <div className="main">
        <GridLayout layout={layout} cols={6} rowHeight={100} width={1000} autoSize={true} draggableCancel={`.no-drag`}>
          {components}
        </GridLayout>
      </div>
    );
  }

  getHeading() {
    return (
      <div key="heading">
        <Heading/>
      </div>
    );
  }

  getDataTable() {
    const component = <DataTable timeData={this.state.timeData}/>;
    return (
      <div key="datatable">
        {this.getComponent(component, 'Tabelle')}
      </div>
    );
  }

  getCalendar() {
    const component = <Calendar log={this.log} timeData={this.state.timeData} dev={this.state.dev}/>;
    return (
      <div key="calendar">
        {this.getComponent(component, 'Kalender')}
      </div>
    );
  }

  getSignature(name) {
    return (
      <div key={`signature-${name}`}>
        <Signature/>
      </div>
    );
  }

  getFileUpload() {
    return (
      <div key="fileupload">
        <FileUpload setFile={this.setFile} clearFile={this.clearFile}/>
      </div>
    );
  }

  getConsole() {
    return (
      <div key="console">
        <Console value={this.state.console}/>
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
        text="keine Daten"
        key={`${name}`}
      />;

    return this.hasTimeData() ? component : placeholder;
  }
}

export default hot(module)(App);
