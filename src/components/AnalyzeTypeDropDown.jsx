import React from 'react';
import { connect } from 'react-redux';

import Base from './Base';
import DropDown from './DropDown';

import { CHART_METRIC_TYPES } from '../constants';
import { updateMetricType } from '../reducers/chart';

class AnalyzeTypeDropDown extends Base {

    renderDropDownBody() {
        let metricTypesData = CHART_METRIC_TYPES;
        if (window.location.pathname.indexOf('compare') != -1 ) {
            metricTypesData = metricTypesData.reverse();
        }   
        
        return metricTypesData.map((d, i) => {
            const selected = this.props.metricType.id == d.id
            return (
                <div
                    key={'AnalyzeTypeDrop-' + i} 
                    className={'body-tiles ' + (selected ? 'selected' : '')}
                    onClick={() => selected ? null : this.props.updateMetricType(d)}
                >
                    <p>{d.title}</p>
                </div>
            )
        })
    }
    render() {
        const {
            metricType: {
                title
            } 
        } = this.props;

        return (
            <div className='AnalyzeTypeDropDown'>
                <DropDown 
                    header={<DropDown.Header displayLogo={false} displayTicker={false} name={title}/>}
                    borderColor={this.props.borderColor}
                    body={this.renderDropDownBody()}
                >
                    
                </DropDown>
            </div>
        );
    }
}

const mapStateToProps = ({ chart }) => {
    return {
        metricType: chart.metricType
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateMetricType: (metricType) => dispatch(updateMetricType(metricType))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnalyzeTypeDropDown);
