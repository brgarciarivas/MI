import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';

const HomeHeader = (props) => {
   
    return (
        <div className={'HomeHeader'}>
            <VisibilitySensor onChange={props.children}/>
           
            <h5>Setcoins</h5>
        </div>
    );
    
}

export default HomeHeader;
