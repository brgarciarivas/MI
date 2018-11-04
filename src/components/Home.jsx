import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Base from './Base';
import AnimationCon from './AnimationCon';
import DashboardPage from './DashboardPage';
import HomeNavBar from './HomeNavBar';
import StreamViewer from './StreamViewer';

class Home extends Base {
    render() {
        return (
            <div className='Home'>
                
                <Route 
                    exact 
                    path={'/home'} 
                    render={ 
                        () => <Redirect to={'/home/dashboard'} /> 
                    } 
                />
                <AnimationCon
                    in
                    classNames='nav'
                    appear
                    timeout={800}
                >
                    <HomeNavBar />
                </AnimationCon>
                <Route
                    path={'/home/dashboard'}
                    children={props => {
                        return (
                            <AnimationCon
                                in={this.props.location.pathname.indexOf('dashboard') != -1}
                                classNames='dashboard'
                                appear
                                timeout={{
                                    enter: 1000,
                                    exit: 1000,
                                }}
                            >
                                <DashboardPage {...props}/>
                            </AnimationCon>
                        )  
                    }}
                />
                <Route
                    path={'/home/viewer'}
                    children={props => {
                        return (
                            <AnimationCon
                                in={this.props.location.pathname.indexOf('viewer') != -1}
                                classNames='viewer'
                                appear
                                timeout={{
                                    enter: 1000,
                                    exit: 1000,
                                }}
                            >
                                <StreamViewer {...props}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
