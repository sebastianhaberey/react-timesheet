import React from 'react';
import {FilePond} from 'react-filepond';
import 'filepond/dist/filepond.css';

export class FileUpload extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="panel panel-fileupload">
        {this.getFileUpload()}
      </div>
    );
  }

  getFileUpload() {
    return (
      <div className="fileupload">
        <FilePond
          instantUpload={false}
          allowBrowse={false}
          allowReplace={true}
          dropOnPage={true}
          dropOnElement={false}
          labelIdle='Zeiterfassungsdaten hereinziehen (CSV-Datei)'
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