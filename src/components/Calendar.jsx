import React from 'react';
import {Transition} from './Transition';
import moment from 'moment';
import * as holidays from '../logic/Holidays';

import {
  getFirstDayOfWeek,
  getLastDayOfWeek,
  isWeekend,
  renderAsHours,
  renderAsHoursDecimal
} from '../logic/Time';

// see https://date-fns.org/v2.0.0-alpha.27/docs/FP-Guide

export class Calendar extends React.Component {

  constructor(props) {
    super(props);
    moment.locale('de');
    this.state = {
      currentMonth: this.props.timeData && this.props.timeData.getMonth()
    };
    if (this.state.currentMonth) {
      this.props.log(`Monat identifiziert als ${this.state.currentMonth.format('MMMM YYYY')}.`);
    }
  }

  componentDidMount() {
    this.retrieveHolidays(this.state.currentMonth.year(), 'BE');
  }

  retrieveHolidays(year, federal_state) {
    const calendar = this;
    holidays.queryGermanHolidays(year, federal_state).then(holidays => {
      calendar.setState(() => ({holidays: holidays}));
      calendar.props.log(
        `${calendar.state.holidays.getEntries().length} Feiertage für Deutschland ${year}, Bundesland ${federal_state}, wurden erfolgreich abgerufen.`);
    }).catch(function(error) {
      calendar.props.log(
        `Fehler bei der Abfrage der Feiertage für Deutschland ${year}, Bundesland ${federal_state}: ${error}`);
    });
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

    const rows = [];

    let days = [];
    let day = startDate.clone();
    let formattedDate = '';

    while (day <= endDate) {

      for (let i = 0; i < 7; i++) {

        formattedDate = day.format('D');

        days.push(
          <div className={`col cell`} key={day}>
            <span className={`number ${this.getNumberClass(day, monthStart)}`}>{formattedDate}</span>
            {this.getDuration(day)}
            {this.getHolidayElement(day)}
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

  getDuration(day) {

    const duration = this.props.timeData && this.props.timeData.getDurationForDate(day);

    if (!duration) {
      return <></>;
    }

    return (
      <>
        <div className={`duration duration-1`} key={`duration-1-${day}`}>
          {renderAsHours(duration)}
        </div>
        <div className={`duration duration-2`} key={`duration-2-${day}`}>
          {renderAsHoursDecimal(duration)}
        </div>
      </>
    );
  }

  getHolidayElement(day) {

    const holiday = this.state.holidays && this.state.holidays.getHoliday(day);

    if (!holiday) {
      return <></>;
    }

    return (
      <>
        <div className={`holiday`} key={`holiday-${day}`}>
          {holiday.name}
        </div>
      </>
    );
  }

  getNumberClass(day, monthStart) {

    const classes = [];

    if (!day.isSame(monthStart, 'month')) {
      classes.push('disabled');
    }

    if (isWeekend(day) || (this.state.holidays && this.state.holidays.isHoliday(day))) {
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
