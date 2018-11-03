import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import Base from './Base';
import { HomeContainer, Section } from './Home';
import SavedSwitchContainer from './SavedSwitchContainer';
import TrackedCryptoContainer from './TrackedCryptoContainer';

import { SavedHeader, SavedRowItem, StartRowSection, EndRowSection } from './SavedHeader';

class TrackedPage extends Base {
    render() {
        return (
                <div className='TrackedPage'>
                    <Section
                        className='first-section'
                    >
                        <div className='tracked-container'>

                            <SavedSwitchContainer 
                                title={'Tracked Cryptocurrencies'}
                            />
                            <CSSTransition
                                in={this.props.savedTileType}
                                classNames='drop'
                                appear
                                timeout={{
                                    enter: 600,
                                    exit: 600,
                                }}
                            >
                                <SavedHeader>
                                    <StartRowSection>
                                        <SavedRowItem
                                            className='name'
                                        >
                                            <p>Cryptocurrency</p>
                                        </SavedRowItem>
                                        <SavedRowItem
                                            className='pattern'
                                        >
                                            <p>Market Cap</p>
                                        </SavedRowItem>
                                        <SavedRowItem
                                            className='metric'
                                        >
                                            <p>Spot Price</p>
                                        </SavedRowItem>
                                        <SavedRowItem
                                            className='direction'
                                        >
                                            <p>Volume</p>
                                        </SavedRowItem>
                                    </StartRowSection>
                                    <EndRowSection>
                                        <SavedRowItem
                                            className='last'
                                        >
                                            <p>Information</p>
                                        </SavedRowItem>
                                    </EndRowSection>
                                </SavedHeader>
                            </CSSTransition>
                            <TrackedCryptoContainer />
                        </div>
                    </Section>
                </div>
        );
    }
}

const mapStateToProps = ({ environment }) => {
    return {
        savedTileType: environment.savedTileType,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackedPage);
