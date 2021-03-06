'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FHIRAuthorizationConfig = exports.DatabaseConfig = exports.UserAuthentication = exports.POSTHeader = exports.AuthorizationHeader = exports.AccessTokenRequestBody = exports.MedicationOrder = exports.Ingredients = exports.InsulinOrder = exports.LabResult = exports.Authentication = exports.Observation = undefined;

var _immutable = require('immutable');

var _constants = require('../util/constants');

var Constants = _interopRequireWildcard(_constants);

var _appConfig = require('../config/app-config');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Observation = exports.Observation = new _immutable.Record({
    resource: '',
    text: '',
    date: '',
    quantity: 0,
    unit: '',
    interpretation: '',
    source: ''
});

var Authentication = exports.Authentication = new _immutable.Record({
    authenticated: true,
    iss: '',
    launch: '',
    state: '',
    hacker: false
});

var LabResult = exports.LabResult = new _immutable.Record({
    code: '',
    observation: null
});

var InsulinOrder = exports.InsulinOrder = new _immutable.Record({
    status: '',
    date: '',
    dosage: 0,
    medication: '',
    comments: '',
    administration: '',
    code: 0,
    ingredients: null
});

var Ingredients = exports.Ingredients = new _immutable.Record({
    codes: (0, _immutable.List)(),
    name: ''
});

var MedicationOrder = exports.MedicationOrder = new _immutable.Record({
    type: '',
    medications: (0, _immutable.List)()
});

var AccessTokenRequestBody = exports.AccessTokenRequestBody = new _immutable.Record({
    grant_type: _appConfig.FHIRConfig.get(_appConfig.ActiveEnv).grant_type,
    code: '',
    redirect_uri: _appConfig.FHIRConfig.get(_appConfig.ActiveEnv).redirect_uri,
    client_id: _appConfig.FHIRConfig.get(_appConfig.ActiveEnv).client_id
});

var AuthorizationHeader = exports.AuthorizationHeader = new _immutable.Record({
    headers: Constants.AUTHORIZATION_HEADER
});

var POSTHeader = exports.POSTHeader = new _immutable.Record({
    "Content-Type": "x-www-form-urlencoded"
});

var UserAuthentication = exports.UserAuthentication = new _immutable.Record({
    state: '',
    iss: '',
    authorizationCode: '',
    accessToken: '',
    authorizationURL: '',
    tokenURL: '',
    patient: 0,
    launch: ''
});

var DatabaseConfig = exports.DatabaseConfig = new _immutable.Record({
    userName: '',
    password: '',
    url: '',
    schema: ''
});

var FHIRAuthorizationConfig = exports.FHIRAuthorizationConfig = new _immutable.Record({
    clientId: '',
    redirectUrl: '',
    responseType: 'code',
    scope: ''
});
//# sourceMappingURL=models.js.map