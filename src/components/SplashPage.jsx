import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import Base from './Base.jsx';
import Button from './Button';

class SplashPage extends Base {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };
    }
    componentDidMount() {
      

        var that = this;
        var myListener = function () {
            console.log('testing mouse events');
            document.removeEventListener('mousemove', myListener, false);
            that.setState({ loaded: true });
        };

        document.addEventListener('mousemove', myListener, false);
    }
    render() {
        return (  
            <div className='SplashPage'>
                <div className='text-container'>
                    <h1>Advanced Cryptocurrency Research Tools</h1>
                
                    <p>Advanced chart pattern analysis, side-by-side comparisons and everything else you’ve come to expect. This is your portal to  the most advanced cryptocurrency research platform to date.
                    </p>
                       
                    <div className='button-container'>
                        <a href="https://itunes.apple.com/us/app/setcoins/id1153859584?mt=8" rel='noopener noreferrer' target="_blank">
                            <div className='button'>
                                <p>iOS App</p>
                            </div>
                        </a>
                        <Button
                            onClick={() => this.props.push('/welcome/onboard/signup')}
                        >
                            <p>Sign Up</p>
                        </Button>
                       
                    </div>
                </div>

                <div className='img-container'>
                    <div 
                        className={'imgBlock ' + (this.state.loaded ? 'active' : 'inactive')}
                    />
                </div>
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
        push: (route) => dispatch(push(route))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashPage);