import React from 'react';
import { AppearTransition } from './AppearTransition';

interface PlaceholderProps {
    name: string;
    icon: React.ReactElement;
    text: string;
}

export const Placeholder: React.FunctionComponent<PlaceholderProps> = ({
    name,
    icon,
    text,
}: PlaceholderProps): React.ReactElement => (
    <div className="panel">
        <AppearTransition>
            <div className="placeholder">
                <div className="name">{name}</div>
                <div className="icon">{icon}</div>
                <div className="text">{text}</div>
            </div>
        </AppearTransition>
    </div>
);
