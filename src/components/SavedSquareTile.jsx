import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';

import Base from './Base';
import SavedRowAction from './SavedRowAction';

class SavedSquareTile extends Base {
    state = {
        action: false
    }
    preventParent(e) {
        e.stopPropagation();
    }
    
    handleExitClick = () => {
        console.log('handleExitClick');
        this.setState({ action: false })
    }
    render() {
        return (
            <div 
                className='SavedSquareTile'
                onClick={this.props.onClick}
            >

                <div
                   
                    className='icon-container-parent'
                >
                   {this.props.action}
                </div>
                <div className='picture-container'>
                    <div className='pic'/>
                </div>
                <div className='divider' />
                {this.props.children}
            </div>
        );
    }
    
}


export default SavedSquareTile;