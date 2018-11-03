import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';

import { SavedHeaderColumnItem } from './SavedHeader';

import Base from './Base';
import SavedRowAction from './SavedRowAction';


class SavedRowTile extends Base {

    state = {
        action: false,
    }
    preventParent(e) {
        e.stopPropagation();
    }
    
    handleExitClick = () => {
        console.log('handleExitClick');
        this.setState({ action: false})
    }
    render() {
        return (
            <div 
                className='SavedRowTile'
                onClick={this.props.onClick}
            >
                {this.props.children}

                {
                    // <div className='end-columns-section'>
                    //     <SavedHeaderColumnItem
                    //         className='saved'
                    //     >   
                    //         {this.props.endSectionItem}
                    //     </SavedHeaderColumnItem>
                    //     <div
                    //         onClick={this.preventParent}
                    //     >
                    //         <SavedHeaderColumnItem className='action'>
                    //             <div 
                    //                 className='icon-container'
                    //                 onClick={() => this.setState({ action: true })}
                    //             >
                    //                 <FontAwesomeIcon 
                    //                     className={'row-icon'}
                    //                     icon={faEllipsisV}
                    //                 />
                    //             </div>
                    //             <CSSTransition
                    //                 timeout={2000}
                    //                 classNames={'action'}
                    //                 in={this.state.action}
                    //                 mountOnEnter
                    //                 unmountOnExit
                    //             >
                    //                 <SavedRowAction 
                    //                     action={this.props.actionData}
                    //                     exit={this.handleExitClick}
                    //                 />
                    //             </CSSTransition>
                    //         </SavedHeaderColumnItem>
                    //     </div>
                    // </div>
                }
                
            </div>
        )
    }
    
}

export default SavedRowTile