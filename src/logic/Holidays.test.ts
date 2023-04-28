import { parseFeiertageApiResult, Holidays } from './Holidays';
import moment from 'moment';

describe('Holidays', (): void => {
    const TESTDATA = {
        Neujahrstag: {
            datum: '2019-01-01',
            hinweis: 'ein Hinweis',
        },
        Frauentag: {
            datum: '2019-03-08',
            hinweis: '',
        },
    };

    let holidays: Holidays;

    beforeEach((): void => {
        holidays = parseFeiertageApiResult(TESTDATA);
    });

    test('parseFeiertageApiResult()', (): void => {
        expect(holidays.getEntries().length).toBe(2);
    });

    test('isHoliday() - positive', (): void => {
        expect(holidays.isHoliday(moment('2019-01-01'))).toBe(true);
    });

    test('isHoliday() - negative', (): void => {
        expect(holidays.isHoliday(moment('2019-01-02'))).toBe(false);
    });

    test('isHoliday() - positive', (): void => {
        const holiday = holidays.getHoliday(moment('2019-01-01'));

        expect(holiday?.name).toBe('Neujahrstag');
        expect(holiday?.info).toBe('ein Hinweis');
    });

    test('isHoliday() - negative', (): void => {
        expect(holidays.getHoliday(moment('2019-01-02'))).toBeUndefined();
    });
});
