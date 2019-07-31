import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import GridLayout from 'react-grid-layout';
import 'moment/locale/de';
import * as log from 'loglevel';

import { Calendar } from './components/Calendar';
import { FileUpload } from './components/FileUpload';
import { DataTable } from './components/DataTable';
import { Placeholder } from './components/Placeholder';
import { Heading } from './components/Heading';
import { Signature } from './components/Signature';

import * as timedata from './logic/TimeData';

import 'react-grid-layout/css/styles.css';
import { FaDatabase } from 'react-icons/fa';
import './App.css';
import * as moment from 'moment';
import { RouteComponentProps } from 'react-router';

/* @formatter:off */
const layout = [
    { i: 'heading', x: 0, y: 0, w: 6, h: 1, isResizable: false },
    { i: 'calendar', x: 0, y: 1, w: 4, h: 5, isResizable: false },
    { i: 'datatable', x: 4, y: 1, w: 2, h: 6, isResizable: false },
    { i: 'fileupload', x: 0, y: 6, w: 4, h: 1, isResizable: false },
    { i: 'signature-1', x: 0, y: 7, w: 3, h: 2, isResizable: false },
    { i: 'signature-2', x: 3, y: 7, w: 3, h: 2, isResizable: false },
];
/* @formatter:on */

const App: React.FunctionComponent<RouteComponentProps> = ({ location }: RouteComponentProps): React.ReactElement => {
    const searchParams = new URLSearchParams(location.search);

    const dev = searchParams.get('dev') === 'true';
    useEffect((): void => log.setLevel(dev ? log.levels.DEBUG : log.levels.INFO, false), [dev]);

    const locale = searchParams.get('locale');
    useEffect((): void => {
        if (locale && locale !== 'de') {
            log.warn(`Tried to select locale '${locale}' but the only supported locale is 'de'`);
        }
        moment.locale('de');
    }, [locale]);

    const [helpText] = useState(
        '' +
            'CSV-Datei mit den Zeiterfassungsdaten für einen Monat hereinziehen.<br>' +
            'Die erste Datumsspalte (DD.MM.YYYY) und die erste Stundenspalte (HH:MM) werden verwendet.<br>' +
            'Überschrift und Unterzeichner können angepasst werden.',
    );
    const [heading, setHeading] = useState('Stundenzettel');
    const [signee1, setSignee1] = useState('Auftragnehmer');
    const [signee2, setSignee2] = useState('Auftraggeber');
    const [file, setFile] = useState();
    const [timeData, setTimeData] = useState(new timedata.TimeData());

    useEffect((): void => {
        if (!file) {
            setTimeData(new timedata.TimeData());
            return;
        }

        const fileName = file.file.name;
        log.debug(`Reading file ${fileName}`);

        timedata.fromFile(file.file).then(
            (result): void => {
                log.debug(`File ${fileName} was read successfully, ${result.getEntries().length} entries found`);
                setTimeData(result);
            },
            (reason): void => {
                log.error(`Error reading file ${file.file.name}: ${reason}`);
            },
        );
    }, [file]);

    return (
        <div className="main">
            <GridLayout
                layout={layout}
                cols={6}
                rowHeight={100}
                width={1000}
                autoSize={true}
                draggableCancel={`.no-drag`}
            >
                <div key="heading">
                    <Heading heading={heading} onHeadingChange={setHeading} />
                </div>
                <div key="calendar">
                    {renderComponentOrPlaceholder(<Calendar timeData={timeData} />, 'Kalender', timeData)}
                </div>
                <div key="datatable">
                    {renderComponentOrPlaceholder(<DataTable timeData={timeData} />, 'Tabelle', timeData)}
                </div>
                <div key="signature-1">
                    <Signature signee={signee1} onSigneeChange={setSignee1} />
                </div>
                <div key="signature-2">
                    <Signature signee={signee2} onSigneeChange={setSignee2} />
                </div>
                <div key="fileupload">
                    <FileUpload onFileChange={setFile} helpText={helpText} />
                </div>
            </GridLayout>
        </div>
    );
};

function renderComponentOrPlaceholder(
    component: React.ReactElement,
    name: string,
    timeData: timedata.TimeData,
): React.ReactElement {
    const placeholder: React.ReactElement = (
        <Placeholder name={name} icon={<FaDatabase />} text="keine Daten" key={`${name}`} />
    );

    return timeData.hasEntries() ? component : placeholder;
}

export default hot(module)(App);
