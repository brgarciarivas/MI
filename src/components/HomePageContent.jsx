import React from 'react';

import Base from './Base';
import ViewDetectionWrapper from './ViewDetectionWrapper';


export const RowCon = ((props) => {
    return (
        <div className={'home-page-row ' + props.className}>
            {props.children}
        </div>
    );
});

export const AssetCon = ((props) => {
    const clonedProps = {
        className: props.className,
        ...props.children.props,
       
    }

    const children = React.Children.map(props.children, child => {
        return React.cloneElement(child, { ...clonedProps });
    })

    return (
        <div className={' HomePageAssetCon' + props.className}>
            {children}
        </div>
    )
});

const TextCon = ((props) => {

    return (
        <div className={'HomePageTextCon' + props.className}>
            {props.children}
        </div>
    );
});

export default class HomePageContent extends Base {
    constructor(props) {
        super(props)
    }

    static RowCon = RowCon;
    static TextCon = ViewDetectionWrapper(TextCon);
    static AssetCon = ViewDetectionWrapper(AssetCon);

    render(){
        return(
            <div className='HomePageContent'>
                {this.props.children}
            </div>
        );
    }
}
