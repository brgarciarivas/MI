import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo, faUsers, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { push } from 'connected-react-router';

import Base from './Base';

class ReporterCard extends Base {
    generateAffliates = () => {
        return this.props.afiliated.map((d, i) => {
            const ImageStyle = {
                backgroundImage: `url(${d.image})`
            }
            return (
                <div 
                    className='afiliated-icon'
                    style={ImageStyle}
                />
            )
        })
    }
    render() {
        console.log('ReporterCard');
        console.log(this.props)
        const ImageStyle = {
            backgroundImage: `url(${this.props.img})`
        }

        return (
            <div 
                className='ReporterCard'
                onClick={() => this.props.push()}
            >
                <div className='ahh'>
                    <div className='live '/>
                    <div 
                        className='avatar'
                        style={ImageStyle}
                    />
                    <div className='info-section'>
                        <h6>{this.props.name}</h6>
                        <div className='num-stats'>
                            
                            <div className='stats'>
                                 <FontAwesomeIcon 
                                    className={'video-icon'}
                                    icon={faVideo}
                                    size={'lg'}
                                />
                                <p>{this.props.viwers}</p>
                            </div>
                            <div className='stats on'>
                                 <FontAwesomeIcon 
                                    className={'users-icon'}
                                    icon={faUsers}
                                    size={'lg'}
                                />
                                <p>{this.props.timeLive}</p>
                            </div>
                        </div>
                        <div className='afiliated-container'>
                            {this.generateAffliates()}
                        </div>
                    </div>
                </div>
                 <FontAwesomeIcon 
                    className={'icon'}
                    icon={faEllipsisV}
                    size={'lg'}
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
        push: () => dispatch(push('/home/stream'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReporterCard);
