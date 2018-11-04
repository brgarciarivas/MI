import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'

import Base from './Base';
import AnimationCon from './AnimationCon';
import LoginPanel from './LoginPanel';
import JournalView from './JournalView';
import JournalNavigation from './JournalNavigation';

import Home from './Home';

class App extends Base {
    constructor(props) {
        super(props);
       
    }
    componentDidUpdate(prevProps) {
       
    }
    render() {
        
        console.log('App');
        console.log(this.props);

        return (
            <div className='App'>

              
                <Route 
                    exact 
                    path={'/'} 
                    render={ 
                        () => <Redirect to={'/journal'} /> 
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
                    path={'/login'}
                    children={props => {
                        return (
                            <AnimationCon
                                in={this.props.location.pathname.indexOf('login') != -1}
                                classNames='login'
                                appear
                                timeout={{
                                    enter: 1000,
                                    exit: 1000,
                                }}
                            >
                                <LoginPanel {...props}/>
                            </AnimationCon>
                        )  
                    }}
                />
                
                <Route
                    path={'/home'}
                    children={props => {
                        return (
                            <AnimationCon
                                in={this.props.location.pathname.indexOf('home') != -1}
                                classNames='main'
                                appear
                                timeout={{
                                    enter: 1000,
                                    exit: 1000,
                                }}
                            >
                                <Home {...props}/>
                            </AnimationCon>
                        )  
                    }}
                />
                <Route
                    path={'/journal'}
                    children={props => {
                        return (
                            <AnimationCon
                                in={this.props.location.pathname.indexOf('journal') != -1}
                                classNames='journal'
                                appear
                                timeout={{
                                    enter: 1000,
                                    exit: 1000,
                                }}
                            >
                                <JournalView {...props}/>
                            </AnimationCon>
                        )  
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = () => {
    return {
       
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
