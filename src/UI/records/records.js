import { Record as immutableRecord, List as immutableList } from 'immutable';

export const ObservationObject = immutableRecord({
    observations: immutableList([]),
    fetching: false,
    fetched: false,
    error: null
});

export const ServerState  = immutableRecord({
    state:''
});

export const Observation = immutableRecord({
    date: '',
    quantity: 0,
    interpretation: ''
});

export const Height = immutableRecord({
    height: 0
});

export const Weight = immutableRecord({
    weight: 0
});

export const HGB = immutableRecord({
    hgb: 0
});

export const HttpError = immutableRecord({ 
    message: '' 
});
