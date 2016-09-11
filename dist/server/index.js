'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = function (_React$Component) {
    _inherits(Component, _React$Component);

    function Component(props) {
        _classCallCheck(this, Component);

        var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, props));

        _this.click = _this.click.bind(_this);
        return _this;
    }

    _createClass(Component, [{
        key: 'click',
        value: function click() {
            alert('something');
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'html',
                null,
                _react2.default.createElement(
                    'head',
                    null,
                    _react2.default.createElement(
                        'title',
                        null,
                        'Diabeties'
                    ),
                    _react2.default.createElement('link', { rel: 'stylesheet', href: '/stylesheets/style.css' })
                ),
                _react2.default.createElement(
                    'body',
                    null,
                    _react2.default.createElement('div', { id: 'app' }),
                    _react2.default.createElement('script', { src: '/javascripts/bundle.js' })
                )
            );
        }
    }]);

    return Component;
}(_react2.default.Component);

exports.default = Component;
//# sourceMappingURL=index.js.map