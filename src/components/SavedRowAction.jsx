import React from 'react';

import Base from './Base';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default class SavedRowAction extends Base {

    constructor(props) {
        super(props)
        this.state = {
            active: false,
        }
        this.autoBind('handleOpen');
    }
    handleOpen() {
        const {
            actionData
        } = this.props
        if (typeof actionData == 'function') {
            console.log('function');
            this.props.actionData()
        } else {
            console.log('should be array of data')
            this.setState({ active: true });
        }
    }
    preventParent(e) {
        console.log('this preventParent');
        e.stopPropagation();
    }
    render() {
      
        const activeState = this.state.active ? 'active' : 'inactive';


        return (
            <div 
                className={`SavedRowAction ${this.props.className} ${activeState}`}
                onClick={this.preventParent}
            >
                <div 
                    className='test-shit'
                    onClick={() => this.handleOpen()}
                >
                    {this.props.children}
                </div>
               
               
                <div className={'actions-container '}>
                    <div 
                        className={'exit ' + activeState}
                        onClick={() => this.setState({ active: false })}
                    >
                        <FontAwesomeIcon
                            icon={faTimes}
                        />
                    </div>
                    <div className={'column data-container ' + activeState }>
                        {
                            this.state.active && this.props.actionData.map((d, i) => {
                                return (
                                    <div 
                                        key={d.title + '-' + i}
                                        className='action-row'
                                        onClick={d.action}
                                    >
                                        <FontAwesomeIcon
                                            icon={d.icon}
                                            className='action-icon'
                                        />
                                        <p>{d.title}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                
            </div>
        );
    }
}

