'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _wrap = require('../util/wrap');

var _wrap2 = _interopRequireDefault(_wrap);

var _observationHelper = require('../helper/observation-helper');

var ObservationHelper = _interopRequireWildcard(_observationHelper);

var _models = require('../models/models');

var Records = _interopRequireWildcard(_models);

var _constants = require('../util/constants');

var Constants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/observations/:state', (0, _wrap2.default)(regeneratorRuntime.mark(function _callee(req, res, next) {
    var observations;
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.prev = 0;

                    console.log('state = ' + req.params.state);
                    _context.next = 4;
                    return ObservationHelper.fetchObservationResults(req.params.state);

                case 4:
                    observations = _context.sent;

                    res.send(observations);
                    _context.next = 12;
                    break;

                case 8:
                    _context.prev = 8;
                    _context.t0 = _context['catch'](0);

                    console.log('err = ' + _context.t0);
                    next(_context.t0);

                case 12:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this, [[0, 8]]);
})));

exports.default = router;
//# sourceMappingURL=observation-controller.js.map