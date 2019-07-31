import React from "react";
import {File, FilePond} from "react-filepond";
import "filepond/dist/filepond.css";
import {AppearTransition} from "./AppearTransition";

type FileUploadProps = {
    helpText: string
    onFileChange: (file: File | null) => void
}

export const FileUpload: React.FunctionComponent<FileUploadProps> = ({helpText, onFileChange}: FileUploadProps) => (
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
                    onaddfile={(error: any, file: any) => { // filepond's @types declaration does not fit the actual signature here
                        onFileChange(file);
                    }}
                    onremovefile={() => {
                        onFileChange(null);
                    }}
                />
            </div>
        </AppearTransition>
    </div>
);
