"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCustomerDetails = exports.getCustomerDetails = exports.createCustomerDetails = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = _interopRequireWildcard(require("../config/database"));
var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var CustomerDetails = require('../models/customerDetails.js')(_database["default"], _database.DataTypes);
var createCustomerDetails = exports.createCustomerDetails = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(body) {
    var createCustomer;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return CustomerDetails.create(body);
        case 3:
          createCustomer = _context.sent;
          return _context.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: createCustomer,
            message: 'CustomerDetails Successfull Createed!'
          });
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", {
            code: _httpStatusCodes["default"].BAD_REQUEST,
            data: _context.t0,
            message: 'CustomerDetails not Createed!'
          });
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function createCustomerDetails(_x) {
    return _ref.apply(this, arguments);
  };
}();
var updateCustomerDetails = exports.updateCustomerDetails = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(body, customerId) {
    var customerDetails;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return CustomerDetails.findOne({
            where: {
              id: customerId
            }
          });
        case 2:
          customerDetails = _context2.sent;
          if (!customerDetails) {
            _context2.next = 13;
            break;
          }
          customerDetails.name = body.name ? body.name : customerDetails.name;
          customerDetails.mobileNumber = body.mobileNumber ? body.mobileNumber : customerDetails.mobileNumber;
          customerDetails.address = body.address ? body.address : customerDetails.address;
          customerDetails.city = body.address ? body.city : customerDetails.city;
          customerDetails.state = body.state ? body.state : customerDetails.state;
          customerDetails.save();
          return _context2.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: customerDetails,
            message: 'CustomerDetails Successfull updated!'
          });
        case 13:
          return _context2.abrupt("return", {
            code: _httpStatusCodes["default"].BAD_REQUEST,
            data: [],
            message: 'CustomerDetails not Exit!'
          });
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function updateCustomerDetails(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
var getCustomerDetails = exports.getCustomerDetails = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(userId) {
    var customerDetails;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return CustomerDetails.findAll({
            where: {
              userId: userId
            }
          });
        case 2:
          customerDetails = _context3.sent;
          if (!customerDetails) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: customerDetails,
            message: 'CustomerDetails Successfull Get!'
          });
        case 7:
          return _context3.abrupt("return", {
            code: _httpStatusCodes["default"].BAD_REQUEST,
            data: [],
            message: 'CustomerDetails Not Exit!'
          });
        case 8:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getCustomerDetails(_x4) {
    return _ref3.apply(this, arguments);
  };
}();