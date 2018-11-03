import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import Base from './Base';

import CoinDisplay from './CoinDisplay';


const Header = (props) => {
   
    return (
        <div className='Header'>
            <CoinDisplay 
                {...props}
            />
            <FontAwesomeIcon 
                className={'header-icon'}
                icon={faChevronDown}
            />
        </div>
    )
}

export default class DropDown extends Base {
    constructor(props) {
        super(props)
        this.autoBind('closeDropDown', 'handleSelect')
        this.state = {
            opened: false,
            stage: 'inital',
        }
    }
    closeDropDown() {
        this.setState({ opened: false })
        if (this.props.onReset) this.props.onReset()
    }
    handleSelect(e) {
        
        if (!this.state.opened) {
            this.setState({
                opened: true
            })
        } else {
            this.setState({
                opened: false
            })
        }
        
    }

    static Header = Header;

    render() {
        const { opened } = this.state;
        const { header, borderColor, body } = this.props;
        
        return (
            <div className='DropDownContainer'>
                <div className='dd-parent'>
                    <div 
                        className={`DropDown ${opened ? 'open' : 'close'}`}
                        style={{ border: `solid 2px ${borderColor}` }}
                        onClick={this.handleSelect}
                    >
                        {
                            opened &&  
                            <p 
                                className='exit'
                                onClick={() => this.setState({ opened: false })}
                            >
                                x
                            </p>
                        }
                       
                        <div className={`header-container ${opened ? 'open' : 'close'}`}>
                            { header }
                        </div>
                        <div 
                            className={`body ${opened ? 'open' : 'close'}`}
                            
                        >
                            {body}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

