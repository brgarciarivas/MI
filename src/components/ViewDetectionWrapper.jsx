import React from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import Base from './Base.jsx';

//https://github.com/joshwnj/react-visibility-sensor
const ViewDetectionWrapper = (WrappedComponent) => {
    class hoc extends Base {
        constructor(props) {
            super(props);
            this.autoBind('onChange');
            this.state = {
                viewed: false,
                inView: false,
            }
        }

        onChange (isVisible) {
            if (!this.state.viewed && isVisible) {
                this.setState({
                    viewed: true
                })
            }
            this.setState({
                inView: isVisible
            })

        }

        render() {
            return (
                <VisibilitySensor onChange={this.onChange} className='ViewDetectionWrapper' >
                    <WrappedComponent 
                        {...this.props} 
                        viewed={this.state.viewed}
                        inView={this.state.inView}
                        className={ ' ' +(this.state.viewed ? 'viewed' : 'unseen') + ' ' + (this.state.inView ? 'inView' : 'outaView')}
                    />
                </VisibilitySensor>
            );
        }
    }

    return hoc;
}

export default ViewDetectionWrapper;