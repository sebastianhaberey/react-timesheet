import React from 'react';
import {Transition} from './Transition';

export class Heading extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onHeadingChange(event.target.value);
  }

  render() {
    return (
      <div className="panel">
        <Transition component={this.renderHeading()}/>
      </div>
    );
  }

  renderHeading() {
    return (
      <div className="heading no-drag">
        <input
          className="text"
          type="text"
          value={this.props.heading}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
