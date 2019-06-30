import {parseFeiertageApiResult, Holidays} from "./Holidays";
import moment from 'moment';

describe('Holidays', function () {

    const TESTDATA = {
        "Neujahrstag": {
            "datum": "2019-01-01",
            "hinweis": "ein Hinweis"
        },
        "Frauentag": {
            "datum": "2019-03-08",
            "hinweis": ""
        }
    }

    let holidays: Holidays;

    beforeEach(()=> {
        holidays = parseFeiertageApiResult(TESTDATA);
    })

    test('parseFeiertageApiResult()', () => {
        expect(holidays.getEntries().length).toBe(2);
    });

    test('isHoliday() - positive', () => {
        expect(holidays.isHoliday(moment('2019-01-01'))).toBe(true);
    });

    test('isHoliday() - negative', () => {
        expect(holidays.isHoliday(moment('2019-01-02'))).toBe(false);
    });

    test('isHoliday() - positive', () => {
        const holiday = holidays.getHoliday(moment('2019-01-01'));
        expect(holiday.name).toBe('Neujahrstag');
        expect(holiday.info).toBe('ein Hinweis');
    });

    test('isHoliday() - negative', () => {
        expect(holidays.getHoliday(moment('2019-01-02'))).toBeUndefined();
    });
});


