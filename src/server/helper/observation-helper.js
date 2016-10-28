"use strict";

import * as Records from '../models/models';
import { List } from 'immutable';
import * as Constants from '../util/constants';
import { get } from '../service/http-service'
import * as HttpUtil from '../util/http-utils';
import UserAuthenticationModel from '../models/UserAuthenticationSchema';

//Public functions
export const fetchGlucoseResults = function* (state) {
    const result = yield* fetchObservationResultsHelper(state, ["GLUCOSE"]);
    return HttpUtil.checkResponseStatus(result) ? buildGlucoseResultsFromJson(result) : null;
};

export const fetchLabResults = function* (state) {
    const result = yield* fetchObservationResultsHelper(state, ["SERUM_CO2", "SERUM_POTASSIUM", "SERUM_SODIUM", "ANION_GAP", "PH_VENOUS", "PH_ARTERIAL", "PCO2_Venous", "PCO2_ARTERIAL", "BASE_DEFICIT_VENOUS", "BASE_DEFICIT_ARTERIAL", "URINE_KETONE"], new Date(), 24);
    return HttpUtil.checkResponseStatus(result) ? buildLabResultsFromJson(result) : null;
};


//Private functions
const fetchObservationResultsHelper = function* (state, lonicCodes, date = null, duration = 0) {
    const [userAuthenticationModel] = yield UserAuthenticationModel.findByState(state);
    console.log('range = ');
    console.log(getDateRange(date,duration));
    const url = HttpUtil.buildObeservationURL(userAuthenticationModel.patient, lonicCodes, userAuthenticationModel.iss,getDateRange(date,duration));
    const authHeader = HttpUtil.buildAuthorizationHeader(userAuthenticationModel);
    const result = yield get(url, authHeader);
    return result;
};

const getDateRange = (date, duration) => {
    if (date && duration) {
        const today = new Date(date);
        const yesterday = new Date(today);
        yesterday.setHours(today.getHours() - 24);
        return [new Date(yesterday).toISOString(), today.toISOString()];
    }
    return null;
}

const buildGlucoseResultsFromJson = (json) => {
    let glucose = (json.data && json.data.entry) ? json.data.entry.map((entry) => {
        if (entry && entry.resource) {
            const resource = entry.resource;
            return new Records.Observation({
                resource: (resource.code) ? resource.code.coding : null,
                text: (resource.code) ? resource.code.text : null,
                date: resource.issued,
                quantity: resource.valueQuantity.value,
                interpretation: (resource.interpretation && resource.interpretation.coding) ? resource.interpretation.coding[0].code : null
            });
        }
    }).filter(entry => (entry) ? true : false) : null;
    return List(glucose);
};

const buildLabResultsFromJson = (json) => {
    let lab = (json.data && json.data.entry) ? json.data.entry.map((entry) => {
        if (entry && entry.resource) {
            const resource = entry.resource;
            return new Records.Observation({
                resource: (resource.code) ? resource.code.coding : null,
                text: (resource.code) ? resource.code.text : null,
                date: resource.issued,
                quantity: resource.valueQuantity ? `${resource.valueQuantity.value} ${resource.valueQuantity.unit}` : null,
                interpretation: (resource.interpretation && resource.interpretation.coding) ? resource.interpretation.coding[0].code : null
            });
        }
    }).filter(entry => (entry) ? true : false) : null;
    return List(lab);
}
