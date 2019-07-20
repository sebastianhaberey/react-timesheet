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
        {this.renderFileUpload()}
      </div>
    );
  }

  renderFileUpload() {

    return (
      <div className="fileupload">
        <FilePond
          instantUpload={false}
          allowBrowse={false}
          allowReplace={true}
          dropOnPage={true}
          dropOnElement={false}
          labelIdle={this.props.helpText}
          onaddfile={(error, file) => {
            this.props.onFileChange(file);
          }}
          onremovefile={() => {
            this.props.onFileClear();
          }}
        />
      </div>
    );
  }
}