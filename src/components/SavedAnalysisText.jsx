import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export const SavedAnalysisTextImage = (props) => {
    const imageStyle = {
        backgroundImage: `url("${props.image_url}")`
    };

    return (
        <div className='SavedAnalysisTextImage'>
            <div 
                className='SavedAnalysisTextImage-image'
                style={imageStyle}
            />
            {props.children}
        </div>
    )
}

export const SavedAnalysisTextSection = (props) => {
    return (
        <div className='SavedAnalysisTextSection'>
            {props.children}
        </div>
    )
}

const SavedAnalysisText = (props) => {
   

    function formateBlueCoinImage(imageUrl) {
        var noExtension = imageUrl.slice(0, -4);
        console.log(noExtension);

        var newname = `${noExtension}Blue.png`
        console.log(newname)

        return newname
    }

    const {
        chart_image_url,
        coin: { image_url, name, ticker_symbol },
        end_range_time,
        percent_change,
        selected_metric,
        signal_strength,
        start_range_time,
        timestamp
    } = props;

    return (
        <div className='SavedAnalysisText'>
            <div className='time-container'>
                <p>Pattern Found</p>
                <p>{moment.unix(timestamp / 1000).format('MM/DD hh:mm a')}</p>
            </div>
            <h1>{selected_metric}</h1>
            <div className='header-section'>
                <SavedAnalysisTextSection>
                    <p>Cryptocurrency</p>
                    <SavedAnalysisTextImage
                        image_url={formateBlueCoinImage(image_url)}
                    >
                        <h3>{name}</h3>
                        <p>({ticker_symbol})</p>
                    </SavedAnalysisTextImage>
                </SavedAnalysisTextSection>
                <SavedAnalysisTextSection>
                    <p>Metric</p>
                    <h3>{selected_metric}</h3>
                </SavedAnalysisTextSection>
            </div>
            <div className='header-section'>
                <SavedAnalysisTextSection>
                    <p>Pattern direction</p>
                    <SavedAnalysisTextImage
                        image_url={image_url}
                    >
                        <h3>Continuation</h3>
                    </SavedAnalysisTextImage>
                </SavedAnalysisTextSection>
                <SavedAnalysisTextSection>
                    <p>Pattern Strength</p>
                    <h3>{signal_strength}</h3>
                </SavedAnalysisTextSection>
            </div>
            <p className='about'>About Pattern</p>
            <p className='about-text'>A pennant is a continuation pattern in technical analysis formed when there is a large movement in a stock, the flagpole, followed by a consolidation period with converging trendlines, the pennant, followed by a breakout movement in the same direction as the initial large movement, the second half of the flagpole.
            </p>
        </div>
    );
    
}

SavedAnalysisText.defaultProps = {
    chart_image_url: null,
    coin: { image_url: 'null.png', name: null, ticker_symbol: null },
    end_range_time: null,
    percent_change: null,
    selected_metric: null,
    signal_strength: null,
    start_range_time: null,
    timestamp: null
};

SavedAnalysisText.propTypes = {

};
export default SavedAnalysisText;
