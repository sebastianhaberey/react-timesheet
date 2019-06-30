import React from 'react';
import {CSSTransitionGroup} from 'react-transition-group';

export class Transition extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CSSTransitionGroup
        className="transition"
        transitionName="transition"
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {this.props.component}
      </CSSTransitionGroup>
    );
  }
}
