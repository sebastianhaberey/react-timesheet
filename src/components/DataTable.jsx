import React from 'react';
import {renderDuration, renderDurationAsDecimal} from '../logic/Time';

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

    const rows = [];
    const data = this.props.data;

    data.forEach((row, index) => {

      let cells = [];

      const rowName = `r${index}`;

      cells.push(
        <div className={`col cell`} key={`${rowName}d`}>
          {row[0].format('L')}
        </div>
      );

      cells.push(
        <div className={`col cell`} key={`r${rowName}h`}>
          {renderDuration(row[1])}
        </div>
      );

      cells.push(
        <div className={`col cell`} key={`r${rowName}sd`}>
          {renderDurationAsDecimal(row[1])}
        </div>
      );

      rows.push(
        <div className="row" key={`R${rowName}`}>
          {cells}
        </div>
      );
    });

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

