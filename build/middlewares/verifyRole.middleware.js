"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyRole = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));
var _dotenv = _interopRequireDefault(require("dotenv"));
_dotenv["default"].config();

/**
 * Middleware to authenticate if user has a valid role.
 * 
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
var verifyRole = exports.verifyRole = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          console.log("verify role: ", req.body);
          _context.prev = 1;
          if (!(req.body.role === 'admin')) {
            _context.next = 6;
            break;
          }
          next();
          _context.next = 7;
          break;
        case 6:
          throw {
            code: _httpStatusCodes["default"].BAD_REQUEST,
            message: 'Unauthorized Role!'
          };
        case 7:
          _context.next = 12;
          break;
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          next(_context.t0);
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 9]]);
  }));
  return function verifyRole(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();