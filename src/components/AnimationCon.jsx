import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

const AnimationCon = ((props) => {

    console.log('AnimationCon');
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


AnimationCon.defaultProps = {
    appear: false,
    in: false,
    mountOnEnter: true,
    unmountOnExit: true,
    timeout: 1000,
}

AnimationCon.propTypes = {
    in: PropTypes.bool.isRequired,
    classNames: PropTypes.string.isRequired,
};

export default AnimationCon