import moment from 'moment';
import leftPad from 'left-pad';

export function renderDuration(duration: moment.Duration): string {
    return `${duration.hours()}:${leftPad(duration.minutes(), 2, '0')}`;
}

export function renderDurationAsDecimal(duration: moment.Duration): string {
    return `${duration.asHours().toFixed(2)}`;
}
