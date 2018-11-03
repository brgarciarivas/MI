import React from 'react';
import { connect } from 'react-redux';
import { Route, IndexRoute, Switch, withRouter, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'

import Base from './Base';


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
