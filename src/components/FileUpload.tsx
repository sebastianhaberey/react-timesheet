import React from "react";
import {FilePond} from "react-filepond";
import "filepond/dist/filepond.css";
import {AppearTransition} from "./AppearTransition";

type FileUploadProps = {
    helpText: string
    onFileChange: (file: File) => void
    onFileClear: () => void
}

export const FileUpload: React.FunctionComponent<FileUploadProps> = ({helpText, onFileChange, onFileClear}: FileUploadProps) => (
    <div className="panel panel-fileupload non-print">
        <AppearTransition>
            <div className="fileupload">
                <FilePond
                    instantUpload={false}
                    allowBrowse={false}
                    allowReplace={true}
                    dropOnPage={true}
                    dropOnElement={false}
                    labelIdle={helpText}
                    onaddfile={(error: any, file: any) => { // filepond's @types declaration does not fit the actual signature here
                        onFileChange(file);
                    }}
                    onremovefile={() => {
                        onFileClear();
                    }}
                />
            </div>
        </AppearTransition>
    </div>
);
