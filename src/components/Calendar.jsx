import React from 'react';
import {Transition} from './Transition';
import moment from 'moment';
import {getFirstDayOfWeek, getLastDayOfWeek, isWeekend} from '../logic/Time';

// see https://date-fns.org/v2.0.0-alpha.27/docs/FP-Guide

export class Calendar extends React.Component {

  constructor(props) {
    super(props);
    moment.locale('de');
    this.state = {
      currentMonth: moment()
    };
  }

  render() {
    return (
      <div className="panel">
        <Transition component={this.getCalendar()}/>
      </div>
    );
  }

  getCalendar() {
    return <div className="calendar">
      {this.renderHeader()}
      {this.renderDays()}
      {this.renderCells()}
    </div>;
  }

  renderHeader() {
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.previousMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{this.state.currentMonth.format('MMMM YYYY')}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {

    const dateFormat = 'EEEE';
    const days = [];

    let startDate = getFirstDayOfWeek(this.state.currentMonth);
    const currentDate = startDate.clone();

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {currentDate.format('dddd')}
        </div>
      );
      currentDate.add(1, 'days');
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {

    const currentMonth = this.state.currentMonth;
    const monthStart = currentMonth.clone().startOf('month');
    const monthEnd = currentMonth.clone().endOf('month');
    const startDate = getFirstDayOfWeek(monthStart);
    const endDate = getLastDayOfWeek(monthEnd);

    const dateFormat = 'd';
    const rows = [];

    let days = [];
    let day = startDate.clone();
    let formattedDate = '';

    while (day <= endDate) {

      for (let i = 0; i < 7; i++) {

        formattedDate = day.format('D');

        days.push(
          <div className={`col cell`} key={day}>
            <span className={`number ${Calendar.getNumberClass(day, monthStart)}`}>{formattedDate}</span>
            <div className={`duration duration-1`} key={`duration-1-${day}`}/>
            <div className={`duration duration-2`} key={`duration-2-${day}`}/>
          </div>
        );
        day.add(1, 'days');
      }

      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );

      days = [];
    }

    return <div className="body">{rows}</div>;
  }

  static getNumberClass(day, monthStart) {

    const classes = [];

    if (!day.isSame(monthStart, 'month')) {
      classes.push('disabled');
    }

    if (isWeekend(day)) {
      classes.push('highlight');
    }

    return classes.join(' ');
  }


  nextMonth = () => {
    this.setState({
      currentMonth: this.state.currentMonth.add(1, 'months')
    });
  };

  previousMonth = () => {
    this.setState({
      currentMonth: this.state.currentMonth.subtract(1, 'months')
    });
  };
}
