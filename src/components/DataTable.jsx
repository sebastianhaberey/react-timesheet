import React from 'react';
import {renderAsHours, renderAsHoursDecimal} from '../logic/Time';

export class DataTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderHeader() {

    return (
      <div className="header row">
        <div className="col col-center" key={'h-date'}>
          Datum
        </div>
        <div className="col col-center" key={'h-hours'}>
          Stunden
        </div>
        <div className="col col-center" key={'h-hours-decimal'}>
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
        <div className={`col cell`} key={`r-${rowName}-date`}>
          {row[0].format('L')}
        </div>
      );

      cells.push(
        <div className={`col cell`} key={`r-${rowName}-hours`}>
          {renderAsHours(row[1])}
        </div>
      );

      cells.push(
        <div className={`col cell`} key={`r-${rowName}-hours-decimal`}>
          {renderAsHoursDecimal(row[1])}
        </div>
      );

      rows.push(
        <div className="row" key={`r${rowName}`}>
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

