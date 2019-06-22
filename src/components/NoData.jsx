import React from 'react';
import {FaDatabase} from 'react-icons/fa';

export class NoData extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="no-data">
        <div className="container">
          <div className="icon">
            <FaDatabase />
          </div>
          <div className="text">
            Keine Daten
          </div>
        </div>
      </div>
    );
  }
}
