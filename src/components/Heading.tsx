import React from 'react';
import { AppearTransition } from './AppearTransition';

interface HeadingProps {
    heading: string;
    onHeadingChange: (value: string) => void;
}

export const Heading: React.FunctionComponent<HeadingProps> = ({
    heading,
    onHeadingChange,
}: HeadingProps): React.ReactElement => (
    <div className="panel">
        <AppearTransition>
            <div className="heading no-drag">
                <input
                    className="text"
                    type="text"
                    value={heading}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>): void => onHeadingChange(event.target.value)}
                />
            </div>
        </AppearTransition>
    </div>
);
