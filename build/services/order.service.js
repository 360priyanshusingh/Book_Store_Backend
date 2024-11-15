"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrder = exports.createOrder = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = _interopRequireWildcard(require("../config/database"));
var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var Cart = require('../models/cart.js')(_database["default"], _database.DataTypes);
var Order = require('../models/order.js')(_database["default"], _database.DataTypes);
var CustomerDetails = require('../models/customerDetails.js')(_database["default"], _database.DataTypes);
var createOrder = exports.createOrder = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(body) {
    var cart, customerDetails, order;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Cart.findOne({
            where: {
              userId: body.userId
            }
          });
        case 2:
          cart = _context.sent;
          if (cart) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", {
            code: _httpStatusCodes["default"].BAD_REQUEST,
            data: cart,
            message: 'cart not exit'
          });
        case 7:
          _context.next = 9;
          return CustomerDetails.findOne({
            where: {
              id: body.shippingAddress
            }
          });
        case 9:
          customerDetails = _context.sent;
          if (customerDetails) {
            _context.next = 12;
            break;
          }
          return _context.abrupt("return", {
            code: _httpStatusCodes["default"].BAD_REQUEST,
            data: order,
            message: 'CustomerDetails Not Exit'
          });
        case 12:
          _context.next = 14;
          return Order.create({
            userId: body.userId,
            totalPrice: cart.totalPrice,
            totalDiscountPrice: cart.totalDiscountPrice,
            totalQuantity: cart.totalQuantity,
            books: cart.books,
            shippingAddress: {
              name: customerDetails.name,
              mobileNumber: customerDetails.mobileNumber,
              address: customerDetails.address,
              city: customerDetails.city,
              state: customerDetails.state
            }
          });
        case 14:
          order = _context.sent;
          _context.next = 17;
          return Cart.destroy({
            where: {
              userId: body.userId
            }
          });
        case 17:
          cart = _context.sent;
          return _context.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: order,
            message: 'order successfully created'
          });
        case 19:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function createOrder(_x) {
    return _ref.apply(this, arguments);
  };
}();
var getOrder = exports.getOrder = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var order;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Order.findOne({
            where: {
              userId: body.userId
            }
          });
        case 2:
          order = _context2.sent;
          if (!order) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: order,
            message: 'order successfully get'
          });
        case 7:
          return _context2.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: [],
            message: 'order not exit'
          });
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getOrder(_x2) {
    return _ref2.apply(this, arguments);
  };
}();