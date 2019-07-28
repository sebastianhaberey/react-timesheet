import React, {useEffect, useState} from "react";
import {hot} from "react-hot-loader";
import GridLayout from "react-grid-layout";
import "moment/locale/de";
import * as log from "loglevel";

import {Calendar} from "./components/Calendar";
import {FileUpload} from "./components/FileUpload";
import {DataTable} from "./components/DataTable";
import {Placeholder} from "./components/Placeholder";
import {Heading} from "./components/Heading";
import {Signature} from "./components/Signature";

import * as timedata from "./logic/TimeData";

import "react-grid-layout/css/styles.css";
import {FaDatabase} from "react-icons/fa";
import "./App.css";
import * as moment from "moment";
import {RouteComponentProps} from "react-router";

/* @formatter:off */
const layout = [
  { i: 'heading', x: 0, y: 0, w: 6, h: 1, isResizable: false },
  { i: 'calendar', x: 0, y: 1, w: 4, h: 5, isResizable: false },
  { i: 'datatable', x: 4, y: 1, w: 2, h: 5, isResizable: false },
  { i: 'signature-1', x: 0, y: 6, w: 3, h: 2, isResizable: false },
  { i: 'signature-2', x: 3, y: 6, w: 3, h: 2, isResizable: false },
  { i: 'fileupload', x: 0, y: 8, w: 6, h: 1, isResizable: false },
];
/* @formatter:on */

const App: React.FunctionComponent<RouteComponentProps> = ({location}: RouteComponentProps) => {

    moment.locale("de");
    const dev = new URLSearchParams(location.search).get("dev") === "true";
    log.setLevel(dev ? log.levels.DEBUG : log.levels.INFO, false);

    const [helpText] = useState("" +
        "CSV-Datei mit den Zeiterfassungsdaten für einen Monat hereinziehen.<br>" +
        "Die erste Datumsspalte (DD.MM.YYYY) und die erste Stundenspalte (HH:MM) werden verwendet.<br>" +
        "Überschrift und Unterzeichner können angepasst werden."
    );
    const [heading, setHeading] = useState("Stundenzettel");
    const [signee1, setSignee1] = useState("Auftraggeber");
    const [signee2, setSignee2] = useState("Auftragnehmer");
    const [file, setFile] = useState();
    const [timeData, setTimeData] = useState(new timedata.TimeData());

    useEffect(() => {

        if (!file) {
            setTimeData(new timedata.TimeData());
            return;
        }

        const fileName = file.file.name;
        log.debug(`Reading file ${fileName}`);

        timedata.fromFile(file.file).then(result => {
            log.debug(`File ${fileName} was read successfully, ${timeData.getEntries().length} entries found`);
            return setTimeData(result);
        }, reason => {
            log.debug(reason);
            log.debug(`Error reading file ${file.file.name}`);
        })

    }, [file]);

    return (
        <div className="main">
            <GridLayout layout={layout} cols={6} rowHeight={100} width={1000} autoSize={true}
                        draggableCancel={`.no-drag`}>
                <div key="heading">
                    <Heading heading={heading} onHeadingChange={setHeading}/>
                </div>
                <div key="calendar">
                    {renderComponentOrPlaceholder(
                        <Calendar timeData={timeData} dev={dev}/>, "Kalender", timeData)}
                </div>
                <div key="datatable">
                    {renderComponentOrPlaceholder(<DataTable timeData={timeData}/>, "Tabelle", timeData)}
                </div>
                <div key="signature-1">
                    <Signature signee={signee1} onSigneeChange={setSignee1}/>
                </div>
                <div key="signature-2">
                    <Signature signee={signee2} onSigneeChange={setSignee2}/>
                </div>
                <div key="fileupload">
                    <FileUpload onFileChange={setFile} helpText={helpText}/>
                </div>
            </GridLayout>
        </div>
    );
};

function renderComponentOrPlaceholder(component: React.ReactElement, name: string, timeData: timedata.TimeData): React.ReactElement {

    const placeholder: React.ReactElement =
        <Placeholder
            name={name}
            icon={<FaDatabase/>}
            text="keine Daten"
            key={`${name}`}
        />;

    return timeData.hasEntries() ? component : placeholder;
}

export default hot(module)(App);
