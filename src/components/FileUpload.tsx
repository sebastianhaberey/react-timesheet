import React from 'react';
import { File, FilePond } from 'react-filepond';
import 'filepond/dist/filepond.css';
import { AppearTransition } from './AppearTransition';

interface FileUploadProps {
    helpText: string;
    onFileChange: (file: File | null) => void;
}

export const FileUpload: React.FunctionComponent<FileUploadProps> = ({
    helpText,
    onFileChange,
}: FileUploadProps): React.ReactElement => (
    <div className="panel panel-fileupload">
        <AppearTransition>
            <div className="fileupload">
                <FilePond
                    instantUpload={false}
                    allowBrowse={false}
                    allowReplace={true}
                    dropOnPage={true}
                    dropOnElement={false}
                    labelIdle={helpText}
                    onaddfile={(error: any, file: any): void => {
                        onFileChange(file);
                    }}
                    onremovefile={(): void => {
                        onFileChange(null);
                    }}
                />
            </div>
        </AppearTransition>
    </div>
);
