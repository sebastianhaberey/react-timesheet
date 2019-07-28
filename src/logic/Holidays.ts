import moment from "moment";
import axios from "axios";

export class Holidays {

    constructor(private entries: any[] = []) {
    }

    public getEntries() {
        return this.entries;
    }

    public isHoliday(date: moment.Moment): boolean {
        return !!this.getHoliday(date);
    }

    public getHoliday(date: moment.Moment): any {
        return this.entries.find(entry => entry.date.isSame(date, 'day'));
    }
}

/**
 * Retrieves german holidays from https://feiertage-api.de/ for a given state.
 *
 * @param year e.g. 2019
 * @param federal_state see https://feiertage-api.de/ for federal state IDs
 */
export function queryGermanHolidays(year: number, federal_state: string): Promise<Holidays> {
    return axios.get(`https://feiertage-api.de/api/?jahr=${year}&nur_land=${federal_state}`).then(response => parseFeiertageApiResult(response.data));
}

export function parseFeiertageApiResult(data: any): Holidays {
    const entries = Object.keys(data).map(key => {

        const entry = data[key];

        if (!entry || !entry.datum) {
            throw `Invalid data for holiday: ${JSON.stringify(entry)}`
        }

        const date = moment(entry.datum, 'YYYY-MM-DD');

        if (!date.isValid()) {
            throw `Invalid data for holiday: ${JSON.stringify(entry.datum)}`
        }

        return {
            name: key,
            date: date,
            info: entry.hinweis,
        };
    });

    return new Holidays(entries);
}
