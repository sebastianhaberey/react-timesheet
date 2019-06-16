import React from 'react';
import {FilePond} from 'react-filepond';
import * as dateFns from 'date-fns';

export class DataTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderHeader() {

    return (
      <div className="header row">
        <div className="col col-center" key={'date'}>
          Datum
        </div>
        <div className="col col-center" key={'hours'}>
          Stunden
        </div>
        <div className="col col-center" key={'hours-dec'}>
          Stunden (D)
        </div>
      </div>
    );
  }

  renderCells() {

    let cells = [];
    const rows = [];

    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        cells.push(
          <div className={`col cell`} key={`C${j}${i}`}>
            blubb
          </div>
        );
      }

      rows.push(
        <div className="row" key={`R${j}`}>
          {cells}
        </div>
      );

      cells = [];
    }

    return <div className="body">{rows}</div>;
  }

  render() {
    return (
      <div className="panel datatable">
        {this.renderHeader()}
        {this.renderCells()}
      </div>
    );
  }
}

