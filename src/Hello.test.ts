import {parse} from "./Hello";

const TESTFILE = toFile(`Datum;Tag;Ein;Aus;Pause;Total
01.04.2019;Mo;08:30;18:20;00:23;09:27
02.04.2019;Di;08:09;15:52;00:31;07:12`);

function toFile(text: string, filename?: string) {
    return new File([new Blob([text], {type: "text/plain;charset=utf-8"})], filename);
}

test('parse simple file', () => {
    return parse(TESTFILE).then(result => {
        return expect(result.data[0]['Datum']).toBe('01.04.2019');
    });
});
