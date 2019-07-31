import moment from 'moment';
import Papa, { ParseError, ParseResult } from 'papaparse';

export function parse(file: File): Promise<ParseResult> {
    return new Promise((resolve, reject): void => {
        Papa.parse(file, {
            complete(result: ParseResult): void {
                resolve(result);
            },
            error(error: ParseError): void {
                reject(error);
            },
        });
    });
}

export function getDate(value: string, format: string): moment.Moment {
    const date = moment(value, format, true);
    if (!date.isValid()) {
        throw `Invalid date for format '${format}': ${value}`;
    }
    return date;
}

export function isDate(value: string, format: string): boolean {
    return moment(value, format, true).isValid();
}

export function isDuration(value: string): boolean {
    // this enforces stricter format HH:MM, values like '0' are not allowed
    return value.search(/^([0-9]|[0-1][0-9]|[2][0-3]):([0-5][0-9])$/g) > -1;
}

export function getDuration(value: string): moment.Duration {
    if (!isDuration(value)) {
        throw `Invalid duration: ${value}`;
    }
    return moment.duration(value);
}

export function isMatchingColumn(
    data: string[][],
    column: number,
    func: (arg0: string) => boolean,
    maxInvalids: number,
): boolean {
    const invalids = data.reduce((invalids: number, row: string[]): number => {
        return func(row[column]) ? invalids : invalids + 1;
    }, 0);

    return invalids <= maxInvalids && invalids < data.length;
}

export function findFirstColumn(
    data: string[][],
    func: (arg0: string) => boolean,
    maxInvalids: number,
    startIndex: number = 0,
): number {
    const columnCount = data[0].length;
    for (let i = startIndex; i < columnCount; i++) {
        if (isMatchingColumn(data, i, func, maxInvalids)) {
            return i;
        }
    }
    return -1;
}

export function removeEmptyLines(data: string[][]): string[][] {
    return data.filter((row): boolean => row.some((value): boolean => value !== ''));
}
