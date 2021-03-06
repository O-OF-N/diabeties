"use strict";

import * as Records from '../models/models';
import { List, Map as immutableMap } from 'immutable';
import * as Constants from '../util/constants';
import { get } from '../service/http-service'
import * as HttpUtil from '../util/http-utils';
import { ObservationFetchError } from '../util/exceptions';
import UserAuthenticationModel from '../models/UserAuthenticationSchema';

//Public functions
export const fetchGlucoseResults = function* (state) {
    const result = Constants.GLUCOSE_RESULT_DURATION_HOURS ?
        yield* fetchObservationResultsHelper(state, Constants.GLUCOSE_CODES, new Date(), Constants.GLUCOSE_RESULT_DURATION_HOURS) :
        yield* fetchObservationResultsHelper(state, Constants.GLUCOSE_CODES);
    return HttpUtil.checkResponseStatus(result) ? buildGlucoseResultsFromJson(result) : null;
};

export const fetchLabResults = function* (state) {
    const result = Constants.LAB_RESULT_DURATION_HOURS ?
        yield* fetchObservationResultsHelper(state, Constants.LABS_LOINIC_CODES, new Date(), Constants.LAB_RESULT_DURATION_HOURS) :
        yield* fetchObservationResultsHelper(state, Constants.LABS_LOINIC_CODES);
    const labs = HttpUtil.checkResponseStatus(result) ? buildLabResultsFromJson(result) : null;
    return groupLabs(Constants.LABS_LOINIC_CODES, labs);
};


//Private functions
const fetchObservationResultsHelper = function* (state, lonicCodesList, date = null, duration = 0) {
    try {
        const [userAuthenticationModel] = yield UserAuthenticationModel.findByState(state);
        const url = HttpUtil.buildObeservationURL(userAuthenticationModel.patient, flatMap(lonicCodesList), userAuthenticationModel.iss, getDateRange(date, duration));
        const authHeader = HttpUtil.buildAuthorizationHeader(userAuthenticationModel);
        const result = yield get(url, authHeader);
        return result;
    } catch (err) {
        if (err.response.status === 500) {
            throw new ObservationFetchError('Cerner services may be down');
        } else {
            throw new ObservationFetchError(err.message);
        }
    }
};

const flatMap = (lonicCodesList) => {
    let lonicCodes = [];
    lonicCodesList ? lonicCodesList.forEach(codes => {
        const lonicCode = Constants.LONIC_CODES.get(codes);
        lonicCode instanceof Array ? lonicCodes.push(...lonicCode) : lonicCodes.push(lonicCode);
    }) : null;
    return lonicCodes;
};

const groupLabs = (loincCodes, results) => loincCodes.map(lc => buildResultLoincMap(lc, Constants.LONIC_CODES.get(lc), results)).filter(r => r.observation.size);

const buildResultLoincMap = (lc, code, results) => new Records.LabResult({ code: lc, observation: results.filter(r => code.includes(r.resource)).sort((r,r1) => r.date<r1.date) });

const getDateRange = (date, duration) => {
    if (date && duration) {
        const today = new Date(date);
        const yesterday = new Date(today);
        yesterday.setHours(today.getHours() - 24);
        return [new Date(yesterday).toISOString(), today.toISOString()];
    }
    return null;
};

const buildGlucoseResultsFromJson = (json) => {
    let glucose = (json.data && json.data.entry) ? json.data.entry.map((entry) => {
        if (entry && entry.resource) {
            const resource = entry.resource;
            return buildObservationFromResource(resource);
        }
    }).filter(entry => (entry) ? true : false).sort(sortGlucose) : null;
    return List(glucose);
};

const buildLabResultsFromJson = (json) => {
    let lab = (json.data && json.data.entry) ? json.data.entry.map((entry) => {
        if (entry && entry.resource) {
            const resource = entry.resource;
            return buildObservationFromResource(resource);
        }
    }).filter(entry => (entry) ? true : false).sort(sortLabs)  : null;
    return List(lab);
};

const buildObservationFromResource = (resource) => new Records.Observation({
    resource: (resource.code && resource.code.coding) ? resource.code.coding.filter(code => code.system === Constants.LONIC_URL)[0]['code'] : null,
    text: (resource.code) ? resource.code.text : null,
    date: resource.issued,
    quantity: resource.valueQuantity && resource.valueQuantity.value ? resource.valueQuantity.value : null,
    unit: resource.valueQuantity && resource.valueQuantity.unit ? resource.valueQuantity.unit : null,
    interpretation: (resource.interpretation && resource.interpretation.coding) ? resource.interpretation.coding[0].code : null,
    source: (resource.category && resource.category.coding) ? resource.category.coding.filter(code => code.system === Constants.OBSERVATION_CATEGORY_URL)[0]['code'] : null
});

const sortGlucose = (r1, r2) => (r1 && r2) ? r1.date > r2.date ? 1 : -1 : 0;

const sortLabs = (r1, r2) => (r1 && r2) ? r1.resource > r2.resource ? 1 : r2.resource > r1.resource ? -1 : r1.date < r2.date ? 1 : -1 : 0;