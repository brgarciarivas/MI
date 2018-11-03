import React from 'react';
import PropTypes from 'prop-types';

import Base from './Base';

const CoinDisplay = ((props) => {
    if (props.blueImage) {
        console.log('blueImage')
    }
    const imageStyle = {
        backgroundImage: `url("${props.imageUrl}")`
    }
    return (
        <div className={'CoinDisplay ' + props.className}>
            {
                props.displayLogo &&  
                <div 
                    className='logo'
                    style={imageStyle}
                />
            }
           
            <p>{props.name}</p>
            { props.displayTicker && <span>({props.tickerSymbol})</span> }
           
        </div>
    );
})

CoinDisplay.defaultProps = {
    displayLogo: true,
    displayTicker: true,
    className: ''
};


CoinDisplay.propTypes = {
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    tickerSymbol: PropTypes.string,
    blueImage: PropTypes.bool,
    displayTicker: PropTypes.bool.isRequired,
    displayLogo: PropTypes.bool.isRequired,
    className: PropTypes.string
};

export default CoinDisplay