import React from 'react';
import leftPad from 'left-pad';

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

      // TODO improve rendering and extract to utils class
      const durationHours = row[1].get('hours');
      const durationMinutes = row[1].get('minutes');
      const durationDecimal = durationMinutes === 0 ? 0 : Math.round(60 / durationMinutes * 10 );

      cells.push(
        <div className={`col cell`} key={`r${rowName}h`}>
          {durationHours}:{leftPad(durationMinutes, 2, '0')}
        </div>
      );

      cells.push(
        <div className={`col cell`} key={`r${rowName}sd`}>
          {durationHours}.{leftPad(durationDecimal, 2, '0')}
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

