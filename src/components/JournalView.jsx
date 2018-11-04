import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Base from './Base';
import JournalSetting from './JournalSetting';
import JournalStream from './JournalStream';
import JournalProfile from './JournalProfile';
import AnimationCon from './AnimationCon';
import JournalNavigation from './JournalNavigation';


class JournalView extends Base {
    render() {
        return (
            <div className='JournalView'>
                <Route 
                    exact 
                    path={'/journal'} 
                    render={ 
                        () => <Redirect to={'/journal/stream'} /> 
                    } 
                />

                <AnimationCon
                    in
                    classNames='profileNav'
                    appear
                    timeout={800}
                >
                    <JournalNavigation />
                </AnimationCon>
                <Route
                    path={'/journal/stream'}
                    children={props => {
                        return (
                            <AnimationCon
                                in={this.props.location.pathname.indexOf('stream') != -1}
                                classNames='stream'
                                appear
                                timeout={{
                                    enter: 1000,
                                    exit: 1000,
                                }}
                            >
                                <JournalStream {...props}/>
                            </AnimationCon>
                        )  
                    }}
                />
                <Route
                    path={'/journal/profile'}
                    children={props => {
                        return (
                            <AnimationCon
                                in={this.props.location.pathname.indexOf('/journal/profile') != -1}
                                classNames='journalPro'
                                appear
                                timeout={{
                                    enter: 1000,
                                    exit: 1000,
                                }}
                            >
                                <JournalProfile {...props}/>
                            </AnimationCon>
                        )  
                    }}
                />

            </div>
           
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JournalView);
