const Papa = require('papaparse');

export module TimeRender {

    export class Month {
        constructor(public fileName: string) {
            Papa.parse(fileName, {
                download: true,
                complete: function(results: any) {
                    console.log(results);
                }
            });
        }
    }

}
