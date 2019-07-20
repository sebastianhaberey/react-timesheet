import React from 'react';
import {FilePond} from 'react-filepond';
import 'filepond/dist/filepond.css';

export class FileUpload extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="panel panel-fileupload non-print">
        {this.getFileUpload()}
      </div>
    );
  }

  getFileUpload() {

    const label = '' +
      'CSV-Datei mit den Zeiterfassungsdaten für einen Monat hereinziehen.<br>' +
      'Die erste Datumsspalte (DD.MM.YYYY) und die erste Stundenspalte (HH:MM) werden verwendet.<br>' +
      'Überschrift und Unterzeichner können angepasst werden.';

    return (
      <div className="fileupload">
        <FilePond
          instantUpload={false}
          allowBrowse={false}
          allowReplace={true}
          dropOnPage={true}
          dropOnElement={false}
          labelIdle={`${label}`}
          onaddfile={(error, file) => {
            this.props.setFile(file);
          }}
          onremovefile={() => {
            this.props.clearFile();
          }}
        />
      </div>
    );
  }
}