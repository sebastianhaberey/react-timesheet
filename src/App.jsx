import React from 'react';
import {hot} from 'react-hot-loader';
import GridLayout from 'react-grid-layout';
import moment from 'moment';
import 'moment/locale/de';
import * as log from 'loglevel';

import {Calendar} from './components/Calendar';
import {FileUpload} from './components/FileUpload';
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
    { i: 'signature-1', x: 0, y: 6, w: 3, h: 2, isResizable: false },
    { i: 'signature-2', x: 3, y: 6, w: 3, h: 2, isResizable: false },
    { i: 'fileupload', x: 0, y: 8, w: 6, h: 1, isResizable: false },
  ];
/* @formatter:on */

class App extends React.Component {

  constructor(props) {

    super(props);

    moment.locale('de');
    log.setLevel(log.levels.INFO, false);

    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleFileClear = this.handleFileClear.bind(this);
    this.handleHeadingChange = this.handleHeadingChange.bind(this);
    this.handleUnderwriter1Change = this.handleUnderwriter1Change.bind(this);
    this.handleUnderwriter2Change = this.handleUnderwriter2Change.bind(this);

    this.state = {
      timeData: new timedata.TimeData(),
      file: [],
      dev: this.getUrlParam('dev') === 'true',
      heading: 'Stundenzettel',
      underwriter1: 'Auftragnehmer',
      underwriter2: 'Auftraggeber',
      helpText: '' +
        'CSV-Datei mit den Zeiterfassungsdaten für einen Monat hereinziehen.<br>' +
        'Die erste Datumsspalte (DD.MM.YYYY) und die erste Stundenspalte (HH:MM) werden verwendet.<br>' +
        'Überschrift und Unterzeichner können angepasst werden.'
    };
  }

  getUrlParam(paramName) {
    return new URLSearchParams(this.props.location.search).get(paramName);
  }

  handleFileChange(file) {

    this.app = this;

    const fileName = file.file.name;

    log.debug(`Reading file ${fileName}`);

    timedata.fromFile(file.file).then(timeData => {

      log.debug(`File ${fileName} was read successfully, ${timeData.getEntries().length} entries found`);
      this.app.setState({
        file: file,
        timeData: timeData
      });

    }, reason => {

      log.debug(reason);
      log.debug(`Error reading file ${fileName}`);
      this.app.handleFileClear();
    });

  }

  handleFileClear() {
    this.setState({
      file: [],
      timeData: new timedata.TimeData()
    });
  }

  handleHeadingChange(heading) {
    this.setState({
      heading: heading
    });
  }

  handleUnderwriter1Change(underwriter) {
    this.setState({
      underwriter1: underwriter
    });
  }

  handleUnderwriter2Change(underwriter) {
    this.setState({
      underwriter2: underwriter
    });
  }

  render() {

    const components = [];

    components.push((
      <div key="heading">
        <Heading heading={this.state.heading} onHeadingChange={this.handleHeadingChange}/>
      </div>
    ));

    components.push((
      <div key="calendar">
        {this.renderComponentOrPlaceholder(<Calendar log={this.log} timeData={this.state.timeData}
                                                     dev={this.state.dev}/>, 'Kalender')}
      </div>
    ));

    components.push((
      <div key="datatable">
        {this.renderComponentOrPlaceholder(<DataTable timeData={this.state.timeData}/>, 'Tabelle')}
      </div>
    ));

    components.push((
      <div key="signature-1">
        <Signature
          underwriter={this.state.underwriter1}
          onUnderwriterChange={this.handleUnderwriter1Change}
        />
      </div>
    ));

    components.push((
      <div key="signature-2">
        <Signature underwriter={this.state.underwriter2} onUnderwriterChange={this.handleUnderwriter2Change}/>
      </div>
    ));

    components.push((
      <div key="fileupload">
        <FileUpload
          onFileChange={this.handleFileChange}
          onFileClear={this.handleFileClear}
          helpText={this.state.helpText}/>
      </div>
    ));

    if (this.state.dev) {
      log.setLevel(log.levels.DEBUG, false);
    }

    return this.renderGridLayout(components);
  }

  renderGridLayout(components) {
    return (
      <div className="main">
        <GridLayout
          layout={layout}
          cols={6}
          rowHeight={100}
          width={1000}
          autoSize={true}
          draggableCancel={`.no-drag`}
        >
          {components}
        </GridLayout>
      </div>
    );
  }

  hasTimeData() {
    return this.state.timeData.hasEntries();
  }

  renderComponentOrPlaceholder(component, name) {

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
