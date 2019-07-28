import React from 'react';
import {CSSTransition} from 'react-transition-group';

// set child = props.children, set props = rest
// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

type TransitionProps = {
}

export const AppearTransition: React.FunctionComponent<TransitionProps> = ({children: child, ...props}: any) => (
    <CSSTransition
        in={true}
        timeout={500}
        appear={true}
        classNames="transition">
        {React.cloneElement(child)}
    </CSSTransition>
);
