import moment from 'moment';
import {getFirstDayOfWeek, getLastDayOfWeek, isWeekend, renderAsHours, renderAsHoursDecimal} from './Time';

test('renderAsHours() - zero', () => {
    expect(renderAsHours(moment.duration({
        minutes: 0,
    }))).toBe('0:00');
});

test('renderAsHours()', () => {
    expect(renderAsHours(moment.duration({
        hours: 23,
        minutes: 59,
    }))).toBe('23:59');
});

test('renderAsHours() - days must be converted to hours', () => {
    expect(renderAsHours(moment.duration({
        days: 5,
        hours: 21,
        minutes: 15,
    }))).toBe('141:15');
});

test('renderAsHours() - seconds must be discarded', () => {
    expect(renderAsHours(moment.duration({
        minutes: 15,
        seconds: 59,
    }))).toBe('0:15');
});

test('renderAsHoursDecimal() - zero', () => {
    expect(renderAsHoursDecimal(moment.duration({
        minutes: 0,
    }))).toBe('0.00');
});

test('renderAsHoursDecimal()', () => {
    expect(renderAsHoursDecimal(moment.duration({
        hours: 23,
        minutes: 59,
    }))).toBe('23.98');
});

test('renderAsHoursDecimal() - days must be converted to hours', () => {
    expect(renderAsHoursDecimal(moment.duration({
        days: 5,
        hours: 21,
        minutes: 15,
    }))).toBe('141.25');
});

test('renderAsHoursDecimal() - seconds must be discarded', () => {
    expect(renderAsHoursDecimal(moment.duration({
        hours: 0,
        minutes: 15,
        seconds: 59,
    }))).toBe('0.25');
});

test('getFirstDayOfWeek() - de: Sunday -> preceding Monday', () => {
    const value = moment('2019-06-23'); // Sunday
    value.locale('de');
    expect(getFirstDayOfWeek(value).isSame('2019-06-17')).toBe(true); // last Monday
});

test('getFirstDayOfWeek() - en: Sunday -> same day', () => {
    const value = moment('2019-06-23'); // Sunday
    value.locale('en');
    expect(getFirstDayOfWeek(value).isSame('2019-06-23')).toBe(true); // same day
});

test('getFirstDayOfWeek() - en: Saturday -> preceding Sunday', () => {
    const value = moment('2019-06-22'); // Saturday
    value.locale('en');
    expect(getFirstDayOfWeek(value).isSame('2019-06-16')).toBe(true); // last Sunday
});

test('getLastDayOfWeek() - de: Sunday -> same day', () => {
    const value = moment('2019-06-23'); // Sunday
    value.locale('de');
    expect(getLastDayOfWeek(value).isSame('2019-06-23')).toBe(true); // same day
});

test('getLastDayOfWeek() - en: Sunday -> Saturday', () => {
    const value = moment('2019-06-23'); // Sunday
    value.locale('en');
    expect(getLastDayOfWeek(value).isSame('2019-06-29')).toBe(true); // Saturday
});

test('isWeekend() - de', () => {
    const value = moment('2019-06-23'); // Sunday
    value.locale('de');
    expect(isWeekend(value)).toBe(true);
});

test('isWeekend() - de', () => {
    const value = moment('2019-06-21'); // Sunday
    value.locale('de');
    expect(isWeekend(value)).toBe(false);
});

test('isWeekend() - de', () => {
    const value = moment('2019-06-22'); // Sunday
    value.locale('en');
    expect(isWeekend(value)).toBe(true);
});
