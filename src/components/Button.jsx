import React from 'react';

import Base from './Base';

export default class Button extends Base {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div
                className={'Button row center ' + this.props.className}
                onClick={this.props.onClick}
                onMouseOver={this.props.onMouseOver}
                style={this.props.style}
            >
                {this.props.children}
            </div>
        );
    }
}

Button.defaultProps = {
    className: '',
    style: {}
};