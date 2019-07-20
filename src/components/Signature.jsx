import React from 'react';
import {Transition} from './Transition';

export class Signature extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="panel">
        <Transition component={this.renderSignature()}/>
      </div>
    );
  }

  renderSignature() {
    return (
      <div className="signature">
      </div>
    );
  }
}
