import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

const SetAnimate = ((props) => {

    console.log('SetAnimate');
    console.log(props)
    return (
        <CSSTransition
            in={props.in}
            classNames={props.classNames}
            appear={props.appear}
            mountOnEnter={props.mountOnEnter}
            unmountOnExit={props.unmountOnExit}
            timeout={props.timeout}
        >
            {props.children}
        </CSSTransition>
    )
})


SetAnimate.defaultProps = {
    appear: false,
    in: false,
    mountOnEnter: true,
    unmountOnExit: true,
    timeout: 1000,
}

SetAnimate.propTypes = {
    in: PropTypes.bool.isRequired,
    classNames: PropTypes.string.isRequired,
};

export default SetAnimate