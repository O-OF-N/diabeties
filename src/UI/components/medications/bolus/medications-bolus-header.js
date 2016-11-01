import React from 'react';
import {
    MedicationHeaderRowStyle,
    MedicationHeaderSpanStyle,
    MedicationFirstHeaderSpanStyle
} from '../../styles';

const BolusMedicationsHeader = () => (
    <div id="div-med-bolus-header" style={MedicationHeaderRowStyle} >
        <span style={MedicationBolusFirstHeaderSpanStyle}>Medication </span>
        <span style={MedicationBolusHeaderSpanStyle}>Dosage </span>
        <span style={MedicationBolusHeaderSpanStyle}>Date </span>
        <span style={MedicationBolusHeaderSpanStyle}>Notes </span>
        <span style={MedicationBolusHeaderSpanStyle}>Additional Comments </span>
    </div >
)

export default BolusMedicationsHeader;