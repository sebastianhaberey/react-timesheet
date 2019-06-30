import React from 'react';
import {Transition} from './Transition';
import moment from 'moment';
import * as holidays from '../logic/Holidays';

import * as time from '../logic/Time';

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

    let startDate = time.getFirstDayOfWeek(this.state.currentMonth);
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

    const startDate = time.getFirstDayOfWeek(this.state.currentMonth.clone().startOf('month'));
    const endDate = time.getLastDayOfWeek(this.state.currentMonth.clone().endOf('month'));

    const rows = [];

    let cells = [];
    let currentDate = startDate.clone();

    while (currentDate <= endDate) {

      for (let i = 0; i < 7; i++) {


        const freeClass = this.isFree(currentDate) ? 'highlight' : '';
        const disabledClass = this.isDisabled(currentDate) ? 'disabled' : '';

        cells.push(
          <div className={`col cell disabled`} key={currentDate}>
            {this.getNumberElement(currentDate, freeClass, disabledClass)}
            {this.getDurationElement(currentDate, disabledClass)}
            {this.getHolidayDescriptionElement(currentDate, disabledClass)}
          </div>
        );
        currentDate.add(1, 'days');
      }

      rows.push(
        <div className="row" key={currentDate}>
          {cells}
        </div>
      );

      cells = [];
    }

    return <div className="body">{rows}</div>;
  }

  getNumberElement(day, freeClass, disabledClass) {

    const formattedDate = day.format('D');

    return (
      <>
        <span className={`number ${freeClass} ${disabledClass}`}>{formattedDate}</span>
      </>
    );
  }

  getDurationElement(day, className) {

    const duration = this.props.timeData && this.props.timeData.getDurationForDate(day);

    if (!duration) {
      return <></>;
    }

    return (
      <>
        <div className={`duration duration-1 ${className}`} key={`duration-1-${day}`}>
          {time.renderAsHours(duration)}
        </div>
        <div className={`duration duration-2 ${className}`} key={`duration-2-${day}`}>
          {time.renderAsHoursDecimal(duration)}
        </div>
      </>
    );
  }

  getHolidayDescriptionElement(day, className) {

    if (!this.isHoliday(day)) {
      return <></>;
    }

    return (
      <>
        <div className={`holiday ${className}`} key={`holiday-${day}`}>
          {this.state.holidays.getHoliday(day).name}
        </div>
      </>
    );
  }

  isDisabled(day) {
    return !day.isSame(this.state.currentMonth, 'month');
  }

  isFree(day) {
    return time.isWeekend(day) || this.isHoliday(day);
  }

  isHoliday(day) {
    return this.state.holidays && this.state.holidays.isHoliday(day);
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
