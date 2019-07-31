import moment from 'moment';
import {
    getFirstDayOfMonth,
    getFirstDayOfWeek,
    getLastDayOfWeek,
    isWeekend,
    renderAsHours,
    renderAsHoursDecimal,
} from './Time';

test('renderAsHours() - undefined', (): void => {
    expect(renderAsHours(undefined)).toBe('');
});

test('renderAsHours() - zero', (): void => {
    expect(
        renderAsHours(
            moment.duration({
                minutes: 0,
            }),
        ),
    ).toBe('0:00');
});

test('renderAsHours()', (): void => {
    expect(
        renderAsHours(
            moment.duration({
                hours: 23,
                minutes: 59,
            }),
        ),
    ).toBe('23:59');
});

test('renderAsHours() - days must be converted to hours', (): void => {
    expect(
        renderAsHours(
            moment.duration({
                days: 5,
                hours: 21,
                minutes: 15,
            }),
        ),
    ).toBe('141:15');
});

test('renderAsHours() - seconds must be discarded', (): void => {
    expect(
        renderAsHours(
            moment.duration({
                minutes: 15,
                seconds: 59,
            }),
        ),
    ).toBe('0:15');
});

test('renderAsHoursDecimal() - undefined', (): void => {
    expect(renderAsHoursDecimal(undefined)).toBe('');
});

test('renderAsHoursDecimal() - zero', (): void => {
    expect(
        renderAsHoursDecimal(
            moment.duration({
                minutes: 0,
            }),
        ),
    ).toBe('0.00');
});

test('renderAsHoursDecimal()', (): void => {
    expect(
        renderAsHoursDecimal(
            moment.duration({
                hours: 23,
                minutes: 59,
            }),
        ),
    ).toBe('23.98');
});

test('renderAsHoursDecimal() - days must be converted to hours', (): void => {
    expect(
        renderAsHoursDecimal(
            moment.duration({
                days: 5,
                hours: 21,
                minutes: 15,
            }),
        ),
    ).toBe('141.25');
});

test('renderAsHoursDecimal() - seconds must be discarded', (): void => {
    expect(
        renderAsHoursDecimal(
            moment.duration({
                hours: 0,
                minutes: 15,
                seconds: 59,
            }),
        ),
    ).toBe('0.25');
});

test('getFirstDayOfWeek() - de: Sunday -> preceding Monday', (): void => {
    const value = moment('2019-06-23'); // Sunday
    value.locale('de');
    expect(getFirstDayOfWeek(value).isSame('2019-06-17')).toBe(true); // last Monday
});

test('getFirstDayOfWeek() - en: Sunday -> same day', (): void => {
    const value = moment('2019-06-23'); // Sunday
    value.locale('en');
    expect(getFirstDayOfWeek(value).isSame('2019-06-23')).toBe(true); // same day
});

test('getFirstDayOfWeek() - en: Saturday -> preceding Sunday', (): void => {
    const value = moment('2019-06-22'); // Saturday
    value.locale('en');
    expect(getFirstDayOfWeek(value).isSame('2019-06-16')).toBe(true); // last Sunday
});

test('getFirstDayOfMonth() - start', (): void => {
    const value = moment('2019-06-01'); // Sunday
    expect(getFirstDayOfMonth(value).isSame('2019-06-01')).toBe(true);
});

test('getFirstDayOfMonth() - end', (): void => {
    const value = moment('2019-06-30'); // Sunday
    expect(getFirstDayOfMonth(value).isSame('2019-06-01')).toBe(true);
});

test('getLastDayOfWeek() - de: Sunday -> same day', (): void => {
    const value = moment('2019-06-23'); // Sunday
    value.locale('de');
    expect(getLastDayOfWeek(value).isSame('2019-06-23')).toBe(true); // same day
});

test('getLastDayOfWeek() - en: Sunday -> Saturday', (): void => {
    const value = moment('2019-06-23'); // Sunday
    value.locale('en');
    expect(getLastDayOfWeek(value).isSame('2019-06-29')).toBe(true); // Saturday
});

test('isWeekend() - de', (): void => {
    const value = moment('2019-06-23'); // Sunday
    value.locale('de');
    expect(isWeekend(value)).toBe(true);
});

test('isWeekend() - de', (): void => {
    const value = moment('2019-06-21'); // Sunday
    value.locale('de');
    expect(isWeekend(value)).toBe(false);
});

test('isWeekend() - de', (): void => {
    const value = moment('2019-06-22'); // Sunday
    value.locale('en');
    expect(isWeekend(value)).toBe(true);
});
