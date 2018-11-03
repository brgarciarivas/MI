import React from 'react';


export const StartRowSection = (props) => {
    return (
        <div className='StartRowSection'>
            {props.children}
        </div>
    )
}

export const EndRowSection = (props) => {
    return (
        <div className='EndRowSection'>
            {props.children}
        </div>
    )
}
export const SavedRowItem = (props) => {

    return (
        <div className={'SavedRowItem ' + props.className}>
            {props.children}
        </div>
    )
}


export const SavedHeader = (props) => {
    return (
        <div className='SavedHeader'>
            {props.children}
        </div>
    )
}

