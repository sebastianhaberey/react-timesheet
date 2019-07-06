import React from 'react';
import {Transition} from './Transition';

export class Console extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (this.textarea) {
      this.textarea.scrollTop = this.textarea.scrollHeight;
    }
  }

  render() {
    return (
      <div className="panel non-print">
        <Transition component={this.getConsole()}/>
      </div>
    );
  }

  getConsole() {
    return (
      <div className="console">
        <textarea
          className="output"
          ref={ref => (this.textarea = ref)}
          value={this.props.value}
          disabled={true}
        />
      </div>
    );
  }
}
