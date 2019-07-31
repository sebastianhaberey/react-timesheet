import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { AppearTransition } from './AppearTransition';
import * as holidays from '../logic/Holidays';
import * as time from '../logic/Time';
import * as timedata from '../logic/TimeData';
import * as log from 'loglevel';

// see https://date-fns.org/v2.0.0-alpha.27/docs/FP-Guide

interface CalendarProps {
    timeData: timedata.TimeData;
}

export const Calendar: React.FunctionComponent<CalendarProps> = ({ timeData }: CalendarProps): React.ReactElement => {
    const [currentMonth] = useState(timeData.getMonth());
    const [theHolidays, setHolidays] = useState();

    useEffect((): void => {
        log.debug(`Month was identified as ${timeData.getMonth().format('MMMM YYYY')}`);
    }, [currentMonth]);

    useEffect((): void => {
        const year = currentMonth.year();
        const federalState = 'BE';

        holidays.queryGermanHolidays(year, federalState).then(
            (result): void => {
                setHolidays(result);
                log.debug(
                    `${
                        result.getEntries().length
                    } holiday dates for Germany ${year} (region ${federalState}) were successfully retrieved`,
                );
            },
            (reason): void => {
                log.error(`Error while querying holiday dates for Germany, ${year}, region ${federalState}: ${reason}`);
            },
        );
    }, [currentMonth]);

    return (
        <div className="panel">
            <AppearTransition>{renderCalendar(currentMonth, theHolidays, timeData)}</AppearTransition>
        </div>
    );
};

function renderCalendar(
    currentMonth: moment.Moment,
    holidays: holidays.Holidays,
    timeData: timedata.TimeData,
): React.ReactElement | null {
    if (!currentMonth) {
        return null;
    }

    return (
        <div className="calendar">
            {renderHeader(currentMonth)}
            {renderDays(currentMonth)}
            {renderBody(currentMonth, holidays, timeData)}
        </div>
    );
}

function renderHeader(currentMonth: moment.Moment): React.ReactElement {
    return (
        <div className="header row flex-middle">
            <div className="col col-center" key="header-middle">
                <span>{currentMonth.format('MMMM YYYY')}</span>
            </div>
        </div>
    );
}

function renderDays(currentMonth: moment.Moment): React.ReactElement {
    const startDate = time.getFirstDayOfWeek(currentMonth);
    const endDate = time.getLastDayOfWeek(currentMonth);
    const currentDate = startDate.clone();

    const days = [];

    while (currentDate <= endDate) {
        days.push(
            <div className="col col-center" key={`days-${currentDate.unix()}`}>
                {currentDate.format('dddd')}
            </div>,
        );

        currentDate.add(1, 'days');
    }

    return <div className="days row">{days}</div>;
}

function renderBody(
    currentMonth: moment.Moment,
    holidays: holidays.Holidays,
    timeData: timedata.TimeData,
): React.ReactElement {
    const startDate = time.getFirstDayOfWeek(currentMonth.clone().startOf('month'));
    const endDate = time.getLastDayOfWeek(currentMonth.clone().endOf('month'));
    const currentDate = startDate.clone();

    const rows = [];

    while (currentDate <= endDate) {
        const cells = [];

        for (let i = 0; i < 7; i++) {
            cells.push(renderCell(currentDate, currentMonth, holidays, timeData));
            currentDate.add(1, 'days');
        }

        rows.push(
            <div className="row" key={`row-${currentDate.unix()}`}>
                {cells}
            </div>,
        );
    }

    return <div className="body">{rows}</div>;
}

function renderCell(
    day: moment.Moment,
    currentMonth: moment.Moment,
    holidays: holidays.Holidays,
    timeData: timedata.TimeData,
): React.ReactElement {
    if (!isInCurrentMonth(day, currentMonth)) {
        return (
            <div className={`col cell`} key={`cell-${day.unix()}`}>
                {renderBackground(day, currentMonth, holidays)}
            </div>
        );
    }

    return (
        <div className={`col cell`} key={`cell-${day.unix()}`}>
            {renderNumber(day, holidays)}
            {renderDuration(day, timeData)}
            {renderHoliday(day, holidays)}
            {renderBackground(day, currentMonth, holidays)}
        </div>
    );
}

function renderNumber(day: moment.Moment, holidays: holidays.Holidays): React.ReactElement {
    const offDayClass = isOffDay(day, holidays) ? 'offday' : 'workday';
    const formattedDate = day.format('D');

    return <span className={`number ${offDayClass}`}>{formattedDate}</span>;
}

function renderDuration(day: moment.Moment, timeData: timedata.TimeData): React.ReactElement | null {
    const duration = getDuration(day, timeData);

    if (!duration) {
        return null;
    }

    return <div className={`duration`}>{time.renderAsHours(duration)}</div>;
}

function renderHoliday(day: moment.Moment, holidays: holidays.Holidays): React.ReactElement | null {
    if (!isHoliday(day, holidays)) {
        return <></>;
    }

    // @ts-ignore false positive
    return <div className={`holiday`}>{holidays.getHoliday(day).name}</div>;
}

function renderBackground(
    day: moment.Moment,
    currentMonth: moment.Moment,
    holidays: holidays.Holidays,
): React.ReactElement {
    let theClass = '';

    if (!isInCurrentMonth(day, currentMonth)) {
        theClass = 'background-not-in-month';
    } else if (isOffDay(day, holidays)) {
        theClass = 'background-holiday';
    } else {
        theClass = 'background-workday';
    }

    return <div className={`background ${theClass} non-print`} />;
}

function getDuration(day: moment.Moment, timeData: timedata.TimeData): moment.Duration | undefined {
    return timeData && timeData.getDurationForDate(day);
}

function isInCurrentMonth(day: moment.Moment, currentMonth: moment.Moment): boolean {
    return day.isSame(currentMonth, 'month');
}

function isOffDay(day: moment.Moment, holidays: holidays.Holidays): boolean {
    return time.isWeekend(day) || isHoliday(day, holidays);
}

function isHoliday(day: moment.Moment, holidays: holidays.Holidays): boolean {
    return holidays && holidays.isHoliday(day);
}
