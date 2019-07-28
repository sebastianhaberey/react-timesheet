import React from 'react';
import {AppearTransition} from './AppearTransition';

type SignatureProps = {
    underwriter: string
    onUnderwriterChange: (value: string) => void
}

export const Signature: React.FunctionComponent<SignatureProps> = ({underwriter, onUnderwriterChange}: SignatureProps) => (
    <div className="panel">
        <AppearTransition>
            <div className="signature">
                <div className="top">
                    <input className="text no-drag" type="text" value={underwriter}
                           onChange={(event: React.ChangeEvent<HTMLInputElement>) => onUnderwriterChange(event.target.value)}/>
                </div>
                <div className="middle"/>
                <div className="bottom">
                    <span className="date">Datum</span>
                    <span className="signature">Unterschrift</span>
                </div>
            </div>
        </AppearTransition>
    </div>
);
