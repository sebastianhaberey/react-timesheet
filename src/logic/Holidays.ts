import moment from 'moment';
import axios from 'axios';

export interface Holiday {
    name: string;
    date: moment.Moment;
    info: string;
}

export class Holidays {
    private readonly entries: Holiday[] = [];

    public constructor(entries: Holiday[] = []) {
        this.entries = entries;
    }

    public getEntries(): Holiday[] {
        return this.entries;
    }

    public isHoliday(date: moment.Moment): boolean {
        return !!this.getHoliday(date);
    }

    public getHoliday(date: moment.Moment): Holiday | undefined {
        return this.entries.find((entry): boolean => entry.date.isSame(date, 'day'));
    }
}

/**
 * Retrieves german holidays from https://feiertage-api.de/ for a given state.
 *
 * @param year e.g. 2019
 * @param federalState see https://feiertage-api.de/ for federal state IDs
 */
export function queryGermanHolidays(year: number, federalState: string): Promise<Holidays> {
    return axios
        .get(`https://feiertage-api.de/api/?jahr=${year}&nur_land=${federalState}`)
        .then((response): Holidays => parseFeiertageApiResult(response.data));
}

// the AxiosResponse contains untyped data
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseFeiertageApiResult(data: any): Holidays {
    const entries = Object.keys(data).map(
        (key): Holiday => {
            const entry = data[key];

            if (!entry || !entry.datum) {
                throw `Invalid data for holiday: ${JSON.stringify(entry)}`;
            }

            const date = moment(entry.datum, 'YYYY-MM-DD');

            if (!date.isValid()) {
                throw `Invalid data for holiday: ${JSON.stringify(entry.datum)}`;
            }

            return {
                name: key,
                date: date,
                info: entry.hinweis,
            };
        },
    );

    return new Holidays(entries);
}
