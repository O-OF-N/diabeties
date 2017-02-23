import React from 'react';
import './IBC.css';
import * as Constants from '../../utils/constants';

var bolusLabel = Constants.bolusLabel;

function validation(carbVal,gluVal,bolus,event) {
	if(isNaN(gluVal) || isNaN(carbVal) || gluVal < 0 || carbVal < 0){
		bolus({totalBolus: -1, bolusValidation: false});
		bolusLabel = Constants.BolusError;
	} else {
		bolusCalculator(carbVal,gluVal,bolus)
	}
}

function bolusCalculator(carbVal,gluVal,bolus){
	var totalBolus = carbVal + gluVal;
    bolus({totalBolus: totalBolus, bolusValidation: true, error: ''});
}


const bolus = ({updateBolusState, bolus, carbVal, gluVal}) => (
		<div>
			  <div className = "Main-Div4" >
			      <h4 className="heading-text">Total Rapid-Acting Insulin to Be Given:</h4>
			  </div>
		      <div className = "calc-div">
		            <p>
		              {bolus.bolusValidation?<label className="Calculate-Label">Total Bolus Dose = {bolus.totalBolus} unit(s)</label> : <label className="Calculate-Label">{bolusLabel}</label>}
		              <button className="Calculate-Button" onClick={validation.bind(null,carbVal,gluVal,updateBolusState)}>   Calculate</button>
		            </p>
		      </div>
		</div>
	);

export default bolus;