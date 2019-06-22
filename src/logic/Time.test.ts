import moment from 'moment';
import {renderDuration, renderDurationAsDecimal} from './Time';

test('renderDuration()', () => {
    expect(renderDuration(moment.duration('23:59'))).toBe('23:59');
});

test('renderDuration()', () => {
    expect(renderDuration(moment.duration('0'))).toBe('0:00');
});

test('renderDurationAsDecimal()', () => {
    expect(renderDurationAsDecimal(moment.duration('1:15'))).toBe('1.25');
});

test('renderDurationAsDecimal()', () => {
    expect(renderDurationAsDecimal(moment.duration('0'))).toBe('0.00');
});

test('renderDurationAsDecimal()', () => {
    expect(renderDurationAsDecimal(moment.duration('0:03'))).toBe('0.05');
});
