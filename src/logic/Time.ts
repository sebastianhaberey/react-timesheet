import moment from 'moment';
import leftPad from 'left-pad';

/**
 * Renders the given duration as hours in the format "141:25". Seconds will be discarded.
 */
export function renderAsHours(duration: moment.Duration): string {
    duration = duration.clone(); // don't modify input parameter
    const secondsAndMinutes = moment.duration({
        seconds: duration.seconds(),
        minutes: duration.minutes(),
    });
    duration.subtract(secondsAndMinutes);
    return `${duration.asHours()}:${leftPad(secondsAndMinutes.minutes(), 2, '0')}`;
}

/**
 * Renders the given duration as hours in the format "141.15". Seconds will be discarded.
 */
export function renderAsHoursDecimal(duration: moment.Duration): string {
    duration = duration.clone(); // don't modify input parameter
    duration.subtract(moment.duration({
        seconds: duration.seconds()
    }));
    return `${duration.asHours().toFixed(2)}`;
}
