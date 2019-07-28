import React from "react";
import {AppearTransition} from "./AppearTransition";

type HeadingProps = {
    heading: string;
    onHeadingChange: (value: string) => void;
}

export const Heading: React.FunctionComponent<HeadingProps> = ({heading, onHeadingChange}: HeadingProps) => (
    <div className="panel">
        <AppearTransition>
            <div className="heading no-drag">
                <input
                    className="text"
                    type="text"
                    value={heading}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => onHeadingChange(event.target.value)}
                />
            </div>
        </AppearTransition>
    </div>
);
