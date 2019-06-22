import moment from 'moment';
import {renderAsHours, renderAsHoursDecimal} from './Time';

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
