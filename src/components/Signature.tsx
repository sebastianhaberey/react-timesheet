import React from 'react';
import { AppearTransition } from './AppearTransition';

interface SignatureProps {
    signee: string;
    onSigneeChange: (value: string) => void;
}

export const Signature: React.FunctionComponent<SignatureProps> = ({
    signee,
    onSigneeChange,
}: SignatureProps): React.ReactElement => (
    <div className="panel">
        <AppearTransition>
            <div className="signature">
                <div className="top">
                    <input
                        className="text no-drag"
                        type="text"
                        value={signee}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
                            onSigneeChange(event.target.value)
                        }
                    />
                </div>
                <div className="middle" />
                <div className="bottom">
                    <span className="date">Datum</span>
                    <span className="signature">Unterschrift</span>
                </div>
            </div>
        </AppearTransition>
    </div>
);
