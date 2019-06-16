import React from 'react';
import {FilePond} from 'react-filepond';

export class Console extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    if (this.textarea) {
      this.textarea.scrollTop = this.textarea.scrollHeight;
    }
  }

  render() {
    return (
      <div className="panel console">
        <textarea
          className="output"
          ref={ref => (this.textarea = ref)}
          value={this.props.value}
          disabled={true}/>
      </div>
    );
  }
}
