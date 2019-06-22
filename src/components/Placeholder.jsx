import React from 'react';

export class Placeholder extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="panel placeholder">
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
    );
  }
}
