const Papa = require('papaparse');

export class Hello {
    public greet() {
        return Papa.parse('Test;Blah').data[0][0];
    }
}