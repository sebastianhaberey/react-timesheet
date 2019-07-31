import { getDate, getDuration } from './Csv';
import { fromColumns, TimeData } from './TimeData';
import * as moment from 'moment';

test('getDurationForDate() - match', (): void => {
    const timeData = new TimeData([
        { date: getDate('01.01.2019', 'DD.MM.YYYY'), duration: getDuration('0:23') },
        { date: getDate('01.02.2019', 'DD.MM.YYYY'), duration: getDuration('8:15') },
    ]);

    expect(timeData.getDurationForDate(getDate('01.02.2019', 'DD.MM.YYYY'))).toEqual(getDuration('8:15'));
});

test('getDurationForDate() - no match', (): void => {
    const timeData = new TimeData([
        { date: getDate('01.01.2019', 'DD.MM.YYYY'), duration: getDuration('0:23') },
        { date: getDate('01.02.2019', 'DD.MM.YYYY'), duration: getDuration('8:15') },
    ]);

    expect(timeData.getDurationForDate(getDate('01.03.2019', 'DD.MM.YYYY'))).toBeUndefined();
});

test('getMonth()', (): void => {
    const timeData = new TimeData([
        { date: getDate('25.01.2019', 'DD.MM.YYYY'), duration: getDuration('0:23') },
        { date: getDate('26.02.2019', 'DD.MM.YYYY'), duration: getDuration('8:15') },
    ]);

    const month = timeData.getMonth();
    expect(month).toBeDefined();
    // @ts-ignore false positive, cannot be undefined here
    expect(month.isSame('2019-01-01')).toBe(true);
});

test('getMonth() - no data', (): void => {
    expect((): moment.Moment => new TimeData([]).getMonth()).toThrowError('no data');
});

test('extractTimeData()', (): void => {
    const data = [
        ['Index', 'Date start', 'Date end', 'Duration'],
        ['0', '01.01.2019', '31.01.2019', '00:23'],
        ['1', '01.02.2019', '28.02.2019', '08:15'],
    ];

    fromColumns(data).then((timeData): void => {
        expect(timeData.getEntries()).toEqual([
            {
                date: getDate('01.01.2019', 'DD.MM.YYYY'),
                duration: getDuration('0:23'),
            },
            {
                date: getDate('01.02.2019', 'DD.MM.YYYY'),
                duration: getDuration('8:15'),
            },
        ]);
    });
});

test('extractTimeData() - no date column', (): void => {
    const data = [['foo', 'bar']];

    fromColumns(data).then(
        (): void => {
            fail('expected missing date column error');
        },
        (reason): void => {
            expect(reason).toMatch(/date column/gi);
        },
    );
});

test('extractTimeData() - no duration column', (): void => {
    const data = [['01.02.2019', 'bar']];

    fromColumns(data).then(
        (): void => {
            fail('expected missing duration column error');
        },
        (reason): void => {
            expect(reason).toMatch(/duration column/gi);
        },
    );
});
