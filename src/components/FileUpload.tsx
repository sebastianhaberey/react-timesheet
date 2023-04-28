import React from 'react';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.css';
import { AppearTransition } from './AppearTransition';
import { FilePondFile } from 'filepond';

interface FileUploadProps {
    helpText: string;
    onFileChange: (file?: FilePondFile) => void;
}

export const FileUpload: React.FunctionComponent<FileUploadProps> = ({
    helpText,
    onFileChange,
}: FileUploadProps): React.ReactElement => (
    <div className="panel panel-fileupload">
        <AppearTransition>
            <div className="fileupload">
                <FilePond
                    credits={false}
                    instantUpload={false}
                    allowBrowse={false}
                    allowReplace={true}
                    dropOnPage={true}
                    dropOnElement={false}
                    labelIdle={helpText}
                    onaddfile={(error: any, file: FilePondFile): void => {
                        onFileChange(file);
                    }}
                    onremovefile={(): void => {
                        onFileChange();
                    }}
                />
            </div>
        </AppearTransition>
    </div>
);
