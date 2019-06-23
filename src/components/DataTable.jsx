import React from 'react';
import {renderAsHours, renderAsHoursDecimal} from '../logic/Time';
import {duration} from 'moment';
import {Transition} from './Transition';

export class DataTable extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="panel">
        <Transition component={this.getDataTable()}/>
      </div>
    );
  }

  getDataTable() {
    return <div className="datatable">
      {DataTable.renderHeader()}
      {this.renderCells()}
    </div>;
  }

  static renderHeader() {
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
    const totalDuration = duration();

    data.forEach((row, index) => {

      const date = row[0];
      const duration = row[1];
      const rowName = `r${index}`;

      rows.push(
        <div className="row" key={`r${rowName}`}>
          {DataTable.renderRow(date, duration, rowName)}
        </div>
      );

      totalDuration.add(duration);
    });

    rows.push(
      <div className="row" key={`r-total`}>
        {DataTable.renderTotal(totalDuration)}
      </div>
    );

    return <div className="body">{rows}</div>;
  }

  static renderRow(date, duration, rowName) {
    let cells = [];

    cells.push(
      <div className={`col cell`} key={`r-${rowName}-date`}>
        {date.format('L')}
      </div>
    );

    cells.push(
      <div className={`col cell`} key={`r-${rowName}-hours`}>
        {renderAsHours(duration)}
      </div>
    );

    cells.push(
      <div className={`col cell`} key={`r-${rowName}-hours-decimal`}>
        {renderAsHoursDecimal(duration)}
      </div>
    );

    return cells;
  }

  static renderTotal(totalDuration) {
    let cells = [];

    cells.push(
      <div className={`col cell total`} key={`r-total-date`}>
      </div>
    );

    cells.push(
      <div className={`col cell total`} key={`r-total-hours`}>
        {renderAsHours(totalDuration)}
      </div>
    );

    cells.push(
      <div className={`col cell total`} key={`r-total-hours-decimal`}>
        {renderAsHoursDecimal(totalDuration)}
      </div>
    );

    return cells;
  }
}

