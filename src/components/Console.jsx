import React from 'react';

export class Console extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  moveCaretAtEnd(event) {
    const temp_value = event.target.value
    event.target.value = ''
    event.target.value = temp_value
  }

  render() {
    return <div className="panel console">
      <textarea
        className="output"
        value={this.props.console}
        autoFocus={true}
        onFocus={this.moveCaretAtEnd}
        disabled={true}/>
    </div>;
  }
}
