import moment from "moment";

const Papa = require('papaparse');

export function parse(file: File): Promise<any> {
    return new Promise(function (resolve, reject) {
        Papa.parse(file, {
            complete: function (results: any) {
                resolve(results);
            },
            error: function (reason: any) {
                reject(reason);
            }
        });
    })
}


export function getDate(value: string, format: string): moment.Moment {
    const date = moment(value, format, true);
    if (!date.isValid()) {
        throw (`Ungültiges Datum für Format '${format}': ${value}`);
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
        throw (`Ungültige Stundenangabe: ${value}`);
    }
    return moment.duration(value);
}

export function isMatchingColumn(data: string[][], column: number, func: (arg0: string) => boolean, maxInvalids: number): boolean {

    const invalids = data.reduce((invalids: number, row: string[]) => {
        return func(row[column]) ? invalids : invalids + 1;
    }, 0);

    return (invalids <= maxInvalids) && (invalids < data.length);
}

export function findFirstColumn(data: string[][], func: (arg0: string) => boolean, maxInvalids: number, startIndex: number = 0): number {
    const columnCount = data[0].length;
    for (let i = startIndex; i < columnCount; i++) {
        if (isMatchingColumn(data, i, func, maxInvalids)) {
            return i;
        }
    }
    return -1;
}

export function removeEmptyLines(data: string[][]) {
    return data.filter(row => row.some(value => value !== ''));
}

export function extractTimeData(data: string[][], log: (arg0: string) => void = () => {}): any[][] {

    const dataTrimmed = removeEmptyLines(data);

    const format = 'DD.MM.YYYY';

    const dateColumn = findFirstColumn(dataTrimmed, (value: string) => isDate(value, format), 2);
    if (dateColumn < 0) {
        throw "Keine Datumsspalte gefunden.";
    }
    log(`Datumsspalte identifiziert: Spalte ${dateColumn}.`);

    const durationColumn = findFirstColumn(dataTrimmed, isDuration, 2, 0);
    if (durationColumn < 0) {
        throw "Keine Stundenspalte gefunden.";
    }
    log(`Stundenspalte identifiziert: Spalte ${durationColumn}.`);

    return dataTrimmed.filter((row, index) => {
        if (!isDate(row[dateColumn], format)) {
            log (`Zeile ${index} übergangen, ungültiger Wert in Datumsspalte. [${row}]`);
            return false;
        }
        if (!isDuration(row[durationColumn])) {
            log (`Zeile ${index} übergangen, ungültiger Wert in Stundenspalte. [${row}]`);
            return false;
        }
        return true;
    }).map((row) => {
        return [getDate(row[dateColumn], format), getDuration(row[durationColumn])];
    });
}