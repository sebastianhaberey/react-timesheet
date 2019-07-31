import moment from 'moment';
import * as log from 'loglevel';
import { getFirstDayOfMonth } from './Time';
import { findFirstColumn, getDate, getDuration, isDate, isDuration, parse, removeEmptyLines } from './Csv';

interface Entry {
    date: moment.Moment;
    duration: moment.Duration;
}

/**
 * Represents a collection of time entries for one month.
 */
export class TimeData {
    private readonly entries: Entry[] = [];

    public constructor(entries: Entry[] = []) {
        this.entries = entries;
    }

    public getEntries(): Entry[] {
        return this.entries;
    }

    public getDurationForDate(date: moment.Moment): moment.Duration | undefined {
        const entry = this.entries.find((entry): boolean => entry.date.isSame(date, 'day'));
        if (!entry) {
            return undefined;
        }
        return entry.duration;
    }

    public getMonth(): moment.Moment {
        if (!this.hasEntries()) {
            throw 'Could not determine month (no data)';
        }
        return getFirstDayOfMonth(this.entries[0].date);
    }

    public hasEntries(): boolean {
        return !!this.entries.length;
    }
}

export function fromFile(file: File): Promise<TimeData> {
    return parse(file).then((result): Promise<TimeData> => fromColumns(result.data));
}

export function fromColumns(data: string[][]): Promise<TimeData> {
    return new Promise<TimeData>((resolve, reject): void => {
        try {
            resolve(parseColumns(data));
        } catch (e) {
            reject(e);
        }
    });
}

function parseColumns(data: string[][]): TimeData {
    const dataTrimmed = removeEmptyLines(data);

    const format = 'DD.MM.YYYY';

    const dateColumn = findFirstColumn(dataTrimmed, (value: string): boolean => isDate(value, format), 2);
    if (dateColumn < 0) {
        throw 'No date column found';
    }
    log.debug(`Found date column (column ${dateColumn})`);

    const durationColumn = findFirstColumn(dataTrimmed, isDuration, 2, 0);
    if (durationColumn < 0) {
        throw 'No duration column found';
    }
    log.debug(`Found duration column (column ${durationColumn})`);

    return new TimeData(
        dataTrimmed
            .filter((row, index): boolean => {
                const dateValue = row[dateColumn];
                if (!isDate(dateValue, format)) {
                    log.debug(`Row ${index} ignored: invalid value "${dateValue}" in date column: "${row}"`);
                    return false;
                }
                const durationValue = row[durationColumn];
                if (!isDuration(durationValue)) {
                    log.debug(`Row ${index} ignored: invalid value "${durationValue}" in durction column: "${row}"`);
                    return false;
                }
                return true;
            })
            .map(
                (row): Entry => {
                    return { date: getDate(row[dateColumn], format), duration: getDuration(row[durationColumn]) };
                },
            ),
    );
}
