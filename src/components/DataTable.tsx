import React from 'react';
import * as moment from 'moment';
import { renderAsHours, renderAsHoursDecimal } from '../logic/Time';
import { AppearTransition } from './AppearTransition';
import { TimeData } from '../logic/TimeData';

interface DataTableProps {
    timeData: TimeData;
}

export const DataTable: React.FunctionComponent<DataTableProps> = ({
    timeData,
}: DataTableProps): React.ReactElement => (
    <div className="panel">
        <AppearTransition>
            <div className="datatable">
                {renderHeader()}
                {renderCells(timeData)}
            </div>
        </AppearTransition>
    </div>
);

function renderHeader(): React.ReactElement {
    return (
        <div className="header row">
            <div className="col" key={'h-date'}>
                Datum
            </div>
            <div className="col" key={'h-hours'}>
                Stunden
            </div>
            <div className="col" key={'h-hours-decimal'}>
                Stunden (D)
            </div>
        </div>
    );
}

function renderCells(timeData: TimeData): React.ReactElement {
    const rows = [];
    const data = (timeData && timeData.getEntries()) || [];
    const totalDuration = moment.duration();

    data.forEach((row, index): void => {
        const date = row.date;
        const duration = row.duration;
        const rowName = `r${index}`;

        rows.push(
            <div className="row" key={`r${rowName}`}>
                {renderRow(date, duration, rowName)}
            </div>,
        );

        totalDuration.add(duration);
    });

    rows.push(
        <div className="row" key={`r-total`}>
            {renderTotal(totalDuration)}
        </div>,
    );

    return <div className="body">{rows}</div>;
}

function renderRow(date: moment.Moment, duration: moment.Duration, rowName: string): React.ReactElement[] {
    let cells = [];

    cells.push(
        <div className="col cell" key={`r-${rowName}-date`}>
            {date.format('L')}
        </div>,
    );

    cells.push(
        <div className="col cell" key={`r-${rowName}-hours`}>
            {renderAsHours(duration)}
        </div>,
    );

    cells.push(
        <div className="col cell" key={`r-${rowName}-hours-decimal`}>
            {renderAsHoursDecimal(duration)}
        </div>,
    );

    return cells;
}

function renderTotal(totalDuration: moment.Duration): React.ReactElement[] {
    let cells = [];

    cells.push(<div className="col cell total" key={`r-total-date`} />);

    cells.push(
        <div className="col cell total" key={`r-total-hours`}>
            {renderAsHours(totalDuration)}
        </div>,
    );

    cells.push(
        <div className="col cell total" key={`r-total-hours-decimal`}>
            {renderAsHoursDecimal(totalDuration)}
        </div>,
    );

    return cells;
}
