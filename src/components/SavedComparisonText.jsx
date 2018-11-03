import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { GITHUB_ROOT } from '../constants';


import { SavedAnalysisTextSection, SavedAnalysisTextImage } from './SavedAnalysisText';

const GithubIconLinks = (props) => {
    console.log('GithubIconLinks');
    console.log(props);

    return (
        <div className='GithubIconLinks'>
            <a
                rel='nopener noreferrer' 
                target='_blank'
                href={`${GITHUB_ROOT}${props.owner}/${props.repo}`}
            >
                <FontAwesomeIcon
                    className='github-icon'
                    icon={faGithub}
                    size='lg'
                />
                <h6>{props.name} Repo.</h6>
            </a>

        </div>
    )
}

const SavedComparisonText = (props) => {
    
    function formateBlueCoinImage(imageUrl) {
        var noExtension = imageUrl.slice(0, -4);
        console.log(noExtension);

        var newname = `${noExtension}Blue.png`
        console.log(newname)

        return newname
    }

    console.log('SavedComparisonText');
    console.log(props);
    const {
        firstCoin,
        secondCoin
    } = props
    return (
        <div className='SavedComparisonText'>
            <h3>Saved Comparisons</h3>
            <p>comparing...</p>
          

            <div className='header-section'>
                <SavedAnalysisTextImage
                    image_url={formateBlueCoinImage(props.firstCoin.image_url)}
                >
                    <h3>{props.firstCoin.name}</h3>
                </SavedAnalysisTextImage>
                <SavedAnalysisTextImage
                    image_url={formateBlueCoinImage(props.secondCoin.image_url)
                    }
                >
                    <h3>{props.secondCoin.name}</h3>
                </SavedAnalysisTextImage>
            </div>
            <div className='header-section'>
                <SavedAnalysisTextSection>
                    <p>Metric & Date Saved</p>
                    <h3>{props.selected_metric}</h3>
                </SavedAnalysisTextSection>
                <SavedAnalysisTextSection>
                    <p>  </p>
                    <h4 className='date-saved'>{moment.unix(props.timestamp / 1000).format('MM/DD hh:mm a')}</h4>
                </SavedAnalysisTextSection>
            </div>
            <div className='header-section'>
                <SavedAnalysisTextSection>
                    <p>Data Source Links</p>
                    <GithubIconLinks 
                        owner={firstCoin.github_owner}
                        repo={firstCoin.github_repo}
                        name={firstCoin.name}
                    />
                </SavedAnalysisTextSection>
                <SavedAnalysisTextSection>
                    <p></p>
                    <GithubIconLinks 
                        owner={secondCoin.github_owner}
                        repo={secondCoin.github_repo}
                        name={secondCoin.name}
                    />
                </SavedAnalysisTextSection>
            </div>
            
        </div>
    );
    
}

SavedComparisonText.defaultProps = {
    chart_image_url: null,
    end_range_time: null,
    selected_metric: null,
    start_range_time: null,
    timestamp: null,

    firstCoin: {
        image_url: null,
        name: null
    },
    first_coin_value: null,
    secondCoin: {
        image_url: null,
        name: null
    },
    second_coin_value: null,
};

SavedComparisonText.propTypes = {
    //name: PropTypes.string
};

export default SavedComparisonText;
