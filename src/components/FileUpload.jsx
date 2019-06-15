import React from 'react';
import {FilePond} from 'react-filepond';
import 'filepond/dist/filepond.css';

export class FileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  render() {
    return (
      <div className="panel panel-no-padding">
        <div className="fileupload">
          <FilePond
            ref={ref => (this.pond = ref)}
            instantUpload={false}
            // files={this.state.files}
            allowBrowse={false}
            onaddfile={(error, file) => {
              this.props.setFile(file);
            }}
            onremovefile={(error, file) => {
              this.props.clearFile();
            }}
            // onupdatefiles={fileItems => {
            //   // Set currently active file objects to this.state
            //   this.setState({
            //     files: fileItems.map(fileItem => fileItem.file)
            //   });
            // }}
            labelIdle='Drag & Drop<br>CSV-Datei'
            // stylePanelLayout="compact"
            styleItemPanelAspectRatio="0.62"
            stylePanelAspectRatio="0.65"
          />
        </div>
      </div>
    );
  }
}