import {getDate, getDuration} from "./Csv";
import {fromColumns, TimeData} from "./TimeData";

test('getDurationForDate() - match', () => {

    const timeData = new TimeData([
        {date: getDate('01.01.2019', 'DD.MM.YYYY'), duration: getDuration('0:23')},
        {date: getDate('01.02.2019', 'DD.MM.YYYY'), duration: getDuration('8:15')},
    ]);

    expect(timeData.getDurationForDate(getDate('01.02.2019', 'DD.MM.YYYY'))).toEqual(getDuration('8:15'));
});

test('getDurationForDate() - no match', () => {

    const timeData = new TimeData([
        {date: getDate('01.01.2019', 'DD.MM.YYYY'), duration: getDuration('0:23')},
        {date: getDate('01.02.2019', 'DD.MM.YYYY'), duration: getDuration('8:15')},
    ]);

    expect(timeData.getDurationForDate(getDate('01.03.2019', 'DD.MM.YYYY'))).toBeUndefined();
});

test('getMonth()', () => {

    const timeData = new TimeData([
        {date: getDate('25.01.2019', 'DD.MM.YYYY'), duration: getDuration('0:23')},
        {date: getDate('26.02.2019', 'DD.MM.YYYY'), duration: getDuration('8:15')},
    ]);

    const month = timeData.getMonth();
    expect(month).toBeDefined();
    // @ts-ignore
    expect(month.isSame('2019-01-01')).toBe(true);
});

test('getMonth()', () => {
    expect(new TimeData([]).getMonth()).toBeUndefined();
});

test('extractTimeData()', () => {

    const data = [
        ['Index', 'Date start', 'Date end', 'Duration'],
        ['0', '01.01.2019', '31.01.2019', '00:23'],
        ['1', '01.02.2019', '28.02.2019', '08:15'],
    ];

    fromColumns(data).then(timeData => {
        expect(timeData.getEntries()).toEqual([
            {
                date: getDate('01.01.2019', 'DD.MM.YYYY'),
                duration: getDuration('0:23')
            },
            {
                date: getDate('01.02.2019', 'DD.MM.YYYY'),
                duration: getDuration('8:15')
            },
        ])
    });

});

test('extractTimeData() - no date column', () => {

    const data = [
        ['foo', 'bar'],
    ];

    fromColumns(data).then(() => {
        fail('expected missing date column error');
    }, reason => {
        expect(reason).toMatch(/keine Datumsspalte/gi);
    })

});

test('extractTimeData() - no duration column', () => {

    const data = [
        ['01.02.2019', 'bar'],
    ];

    fromColumns(data).then(() => {
        fail('expected missing duration column error');
    }, reason => {
        expect(reason).toMatch(/keine Stundenspalte/gi);
    })

});
