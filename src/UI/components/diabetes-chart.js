import React from 'react';
import GlucoseResults from './glucose-results/glucose-results';
import LabResults from './lab-results/lab-results';
import Medications from './medications/medications';
import IBC from './sliding-scale/IBC';
import { inheritStyle } from './styles';
import { connect } from 'react-redux';

const toggle = dispatch => dispatch({ type: Constants.SLIDING_SCALE_TOGGLE_VISIBILITY });

const DiabetesChart = dispatch => (
    <div style={inheritStyle}>

        <section className="demographics-banner">
            <header>
                <div className="demographics-row">
                    <h1>Diabetes Management
                    <button className="btn btn-default" onClick={toggle.bind(null, dis)}>Insulin Bolus Calculator</button>
                    </h1>
                </div>
            </header>
        </section>
        <div style={{ width: '100%', maxHeight: '45%' }}>
            <GlucoseResults />
            {
                slidingScale.visible ?
                    <div> <IBC /> </div> : null
            }
        </div>
        <div style={{ width: '100%', height: '45%', marginTop: '3%' }}>
            <LabResults />
            <Medications />
        </div>

    </div>
);
export default connect(state => ({
    dispatch: state.dispatch,
    slidingScale: state.slidingScale
}))(DiabetesChart);