import { findFirstColumn, isDate, isDuration, isMatchingColumn, parse, removeEmptyLines } from './Csv';

// the line breaks below are important, otherwise the tests will fail
const CSV = `Datum;Tag;Total;Total (dezimal)
02.05.2019;Do;06:49;06.82
03.05.2019;Fr;07:42;07.70
Total;18;141:34;141.57`;

const DATE_FUNCTION = (value: string): boolean => isDate(value, 'DD.MM.YYYY');

test('parse simple file', (): Promise<void> => {
    return parse(CSV).then((result) => {
        expect(result.data[1][0]).toBe('02.05.2019');
    });
});

test('isDate() - valid value', (): void => {
    expect(isDate('01.01.2019', 'DD.MM.YYYY')).toBe(true);
});

test('isDate() - invalid value', (): void => {
    expect(isDate('foo', 'DD.MM.YYYY')).toBe(false);
});

test('isDuration() - valid value min', (): void => {
    expect(isDuration('00:00')).toBe(true);
});

test('isDuration() - valid value max', (): void => {
    expect(isDuration('23:59')).toBe(true);
});

test('isDuration() - single digit hour', (): void => {
    expect(isDuration('0:59')).toBe(true);
});

test('isDuration() - hour too large', (): void => {
    expect(isDuration('24:00')).toBe(false);
});

test('isDuration() - minute too large', (): void => {
    expect(isDuration('00:60')).toBe(false);
});

test('isDuration() - hour too long', (): void => {
    expect(isDuration('000:00')).toBe(false);
});

test('isDuration() - minute too long', (): void => {
    expect(isDuration('00:000')).toBe(false);
});

test('isMatchingColumn() - with header ', (): void => {
    const data = [['Date'], ['01.01.2019'], ['01.02.2019']];

    expect(isMatchingColumn(data, 0, DATE_FUNCTION, 1)).toBe(true);
});

test('isMatchingColumn() - with one invalid value', (): void => {
    const data = [['01.01.2019'], ['foo'], ['01.02.2019']];

    expect(isMatchingColumn(data, 0, DATE_FUNCTION, 0)).toBe(false);
});

test('isMatchingColumn() - no valid values', (): void => {
    const data = [['foo']];

    expect(isMatchingColumn(data, 0, DATE_FUNCTION, 1)).toBe(false);
});

test('findFirstColumn() - date', (): void => {
    const data = [
        ['Index', 'Date start', 'Date end'],
        ['0', '01.01.2019', '31.01.2019'],
        ['1', '01.02.2019', '28.02.2019'],
    ];

    expect(findFirstColumn(data, DATE_FUNCTION, 1)).toBe(1);
});

test('findFirstColumn() - start index', (): void => {
    const data = [
        ['Index', 'Date start', 'Date end'],
        ['0', '01.01.2019', '31.01.2019'],
        ['1', '01.02.2019', '28.02.2019'],
    ];

    expect(findFirstColumn(data, DATE_FUNCTION, 1, 2)).toBe(2);
});

test('findFirstColumn() - duration, start index', (): void => {
    const data = [
        ['Index', 'Date start', 'Date end', 'Duration'],
        ['0', '01.01.2019', '31.01.2019', '00:23'],
        ['1', '01.02.2019', '28.02.2019', '08:15'],
    ];

    expect(findFirstColumn(data, isDuration, 1, 0)).toBe(3);
});

test('findFirstColumn() - start index > column count', (): void => {
    const data = [['foo', 'bar']];

    expect(findFirstColumn(data, isDuration, 1, 999)).toBe(-1);
});

test('findFirstColumn() - not found', (): void => {
    const data = [['foo', 'bar']];

    expect(findFirstColumn(data, isDuration, 0, 0)).toBe(-1);
});

test('findFirstColumn() - testdata, duration', (): Promise<void> => {
    return parse(CSV).then((result) => {
        expect(findFirstColumn(result.data, isDuration, 2, 0)).toBe(2);
    });
});

test('findFirstColumn() - testdata, date', (): Promise<void> => {
    return parse(CSV).then((result) => {
        expect(findFirstColumn(result.data, DATE_FUNCTION, 2, 0)).toBe(0);
    });
});

test('removeEmptyLines()', (): void => {
    const data = [['', ''], ['foo'], []];

    expect(removeEmptyLines(data)).toEqual([['foo']]);
});
