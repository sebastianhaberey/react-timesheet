import React from 'react';
import {Transition} from './Transition';

export class Signature extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onUnderwriterChange(event.target.value);
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
        <div className="top" >
          <input className="text no-drag" type="text" value={this.props.underwriter} onChange={this.handleChange}/>
        </div>
        <div className="middle"/>
        <div className="bottom">
          <span className="date">Datum</span>
          <span className="signature">Unterschrift</span>
        </div>
      </div>
    );
  }
}
