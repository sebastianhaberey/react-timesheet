import React from 'react';
import * as dateFns from 'date-fns';
import {de} from 'date-fns/locale';

// see https://date-fns.org/v2.0.0-alpha.27/docs/FP-Guide

export class Calendar extends React.Component {

  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    selectedLocale: de
  };

  render() {
    return (
      <div className="panel calendar">
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
      </div>
    );
  }

  renderHeader() {
    const dateFormat = 'MMMM yyyy';

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat, {locale: this.state.selectedLocale})}</span>
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

    let startDate = dateFns.startOfWeek(this.state.currentMonth, {locale: this.state.selectedLocale});

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat, {locale: this.state.selectedLocale})}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {

    const {currentMonth, selectedDate} = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart, {locale: this.state.selectedLocale});
    const endDate = dateFns.endOfWeek(monthEnd, {locale: this.state.selectedLocale});

    const dateFormat = 'd';
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {

      for (let i = 0; i < 7; i++) {

        formattedDate = dateFns.format(day, dateFormat, {locale: this.state.selectedLocale});
        const cloneDay = day;

        days.push(
          <div className={`col cell`} key={day}>
            <span className={`number ${this.getNumberClass(day, monthStart, selectedDate)}`}>{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
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

  getCellClass(day, selectedDate) {

    const classes = [];

    if (dateFns.isSameDay(day, selectedDate)) {
      classes.push('selected');
    }

    return classes.join(' ');
  }

  getNumberClass(day, monthStart, selectedDate) {

    const classes = [];

    if (!dateFns.isSameMonth(day, monthStart)) {
      classes.push('disabled');
    }

    if (dateFns.isWeekend(day)) {
      classes.push('highlight');
    }

    return classes.join(' ');
  }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };
}
