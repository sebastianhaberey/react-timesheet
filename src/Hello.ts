const Papa = require('papaparse');

export function parse(file: File): Promise<any> {
    return new Promise(function (resolve, reject) {
        Papa.parse(file, {
            complete: function (results: any) {
                resolve(results);
            },
            error: function (reason) {
                reject(reason);
            },
            header: true
        });
    })
}