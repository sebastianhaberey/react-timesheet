import React, { PropsWithChildren } from 'react';
import { CSSTransition } from 'react-transition-group';

// set child = props.children (supplied by react), set props = rest
// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

export const AppearTransition: React.FunctionComponent<PropsWithChildren<{}>> = ({
    children: child,
}: PropsWithChildren<{}>): React.ReactElement => (
    <CSSTransition in={true} timeout={500} appear={true} classNames="transition">
        {React.cloneElement(child as React.ReactElement)}
    </CSSTransition>
);
