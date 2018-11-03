import React from 'react';

import Base from './Base';

export default class Switcher extends Base {
    constructor(props) {
        super(props)
       
    }
    render() {
        const {
            firstOption,
            secondOption,
            children,
            status,
            handleChange
        } = this.props;


        const selectedStatus = status ? 'left' : 'right';

        return (
            <div className='Switcher'>
                <div 
                    onClick={() => handleChange(true)}
                    className={'first option ' + selectedStatus}
                >
                    {firstOption}
                </div>
                <div className='divider'/>
                <div 
                    className={'second option ' + selectedStatus}
                    onClick={() => handleChange(false)}
                >
                    {secondOption}
                </div>
                <div className={'highlight ' + (status ? 'left' : 'right')}/>
            </div>
        );
    }
}

