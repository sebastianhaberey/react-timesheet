import React from 'react';
import moment from 'moment';
import {Transition} from './Transition';
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
        <Transition component={this.renderCalendar()}/>
      </div>
    );
  }

  renderCalendar() {
    return <div className="calendar">
      {this.renderHeader()}
      {this.renderDays()}
      {this.renderBody()}
    </div>;
  }

  renderHeader() {

    const elements = [];

    elements.push(
      <div className="col col-center" key="header-middle">
        <span>{this.state.currentMonth.format('MMMM YYYY')}</span>
      </div>
    );

    if (this.props.dev) { // only add arrows in dev mode

      elements.unshift(
        <div className="col col-start non-print" key="header-left">
          <div className="icon" onClick={this.switchToPreviousMonth}>chevron_left</div>
        </div>
      );

      elements.push(
        <div className="col col-end non-print" onClick={this.switchToNextMonth} key={`header-right`}>
          <div className="icon">chevron_right</div>
        </div>
      );

    }

    return (
      <div className="header row flex-middle">
        {elements}
      </div>
    );
  }

  renderDays() {

    const startDate = time.getFirstDayOfWeek(this.state.currentMonth);
    const endDate = time.getLastDayOfWeek(this.state.currentMonth);
    const currentDate = startDate.clone();

    const days = [];

    while (currentDate <= endDate) {

      days.push(
        <div className="col col-center" key={`days-${currentDate.unix()}`}>
          {currentDate.format('dddd')}
        </div>
      );

      currentDate.add(1, 'days');
    }

    return <div className="days row">{days}</div>;
  }

  renderBody() {

    const startDate = time.getFirstDayOfWeek(this.state.currentMonth.clone().startOf('month'));
    const endDate = time.getLastDayOfWeek(this.state.currentMonth.clone().endOf('month'));
    const currentDate = startDate.clone();

    const rows = [];

    while (currentDate <= endDate) {

      const cells = [];

      for (let i = 0; i < 7; i++) {
        cells.push(this.renderCell(currentDate));
        currentDate.add(1, 'days');
      }

      rows.push(
        <div className="row" key={`row-${currentDate.unix()}`}>
          {cells}
        </div>
      );
    }

    return <div className="body">{rows}</div>;
  }

  renderCell(day) {

    if (!this.isInCurrentMonth(day)) {
      return (
        <div className={`col cell`} key={`cell-${day.unix()}`}>
          {this.renderBackground(day)}
        </div>
      );
    }

    return (
      <div className={`col cell`} key={`cell-${day.unix()}`}>
        {this.renderNumber(day)}
        {this.renderDuration(day)}
        {this.renderHoliday(day)}
        {this.renderBackground(day)}
      </div>
    );
  }

  renderNumber(day) {

    const offDayClass = this.isOffDay(day) ? 'offday' : 'workday';
    const formattedDate = day.format('D');

    return (
      <span className={`number ${offDayClass}`}>{formattedDate}</span>
    );
  }

  renderDuration(day) {

    const duration = this.getDuration(day);

    if (!duration) {
      return null;
    }

    return (
      <div className={`duration`}>
        {time.renderAsHours(duration)}
      </div>
    );
  }

  renderHoliday(day) {

    if (!this.isHoliday(day)) {
      return <></>;
    }

    return (
      <div className={`holiday`}>
        {this.state.holidays.getHoliday(day).name}
      </div>
    );
  }

  renderBackground(day) {

    let theClass = '';

    if (!this.isInCurrentMonth(day)) {
      theClass = 'background-not-in-month';
    } else if (this.isOffDay(day)) {
      theClass = 'background-holiday';
    } else {
      theClass = 'background-workday';
    }

    return (
      <div className={`background ${theClass} non-print`}>
      </div>
    );
  }

  getDuration(day) {
    return this.props.timeData && this.props.timeData.getDurationForDate(day);
  }

  isInCurrentMonth(day) {
    return day.isSame(this.state.currentMonth, 'month');
  }

  isOffDay(day) {
    return time.isWeekend(day) || this.isHoliday(day);
  }

  isHoliday(day) {
    return this.state.holidays && this.state.holidays.isHoliday(day);
  }

  switchToNextMonth = () => {
    this.setState({
      currentMonth: this.state.currentMonth.add(1, 'months')
    });
  };

  switchToPreviousMonth = () => {
    this.setState({
      currentMonth: this.state.currentMonth.subtract(1, 'months')
    });
  };
}
