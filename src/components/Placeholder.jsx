import React from 'react';
import {Transition} from './Transition';

export class Placeholder extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="panel">
        <Transition component={this.getPlaceholder()}/>
      </div>
    );
  }

  getPlaceholder() {
    return <>
      <div className="placeholder">
        <div className="name">
          {this.props.name}
        </div>
        <div className="icon">
          {this.props.icon}
        </div>
        <div className="text">
          {this.props.text}
        </div>
      </div>
    </>;
  }
}
