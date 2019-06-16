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

export function isDate(value: string, format: string): boolean {
    return moment(value, format, true).isValid();
}

export function isDuration(value: string): boolean {
    return value.search(/^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/g) > -1;
}

export function isMatchingColumn(data: string[][], column: number, func: (arg0: string) => boolean, maxFails: number): boolean {

    const fails = data.reduce((fails: number, row: string[]) => {
        return func(row[column]) ? fails : fails + 1;
    }, 0);

    return fails <= maxFails;
}

export function findFirstColumn(data: string[][], func: (arg0: string) => boolean, maxFails: number, startIndex: number = 0): number {
    const columnCount = data[0].length;
    for (let i = startIndex; i < columnCount; i++) {
        if (isMatchingColumn(data, i, func, maxFails)) {
            return i;
        }
    }
    return -1;
}
