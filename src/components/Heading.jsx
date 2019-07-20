import React from 'react';
import {Transition} from './Transition';

export class Heading extends React.Component {

  constructor(props) {
    super(props);
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
        <input className="text" type="text" defaultValue="Stundenzettel"/>
      </div>
    );
  }
}
