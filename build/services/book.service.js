"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateBook = exports.getAllBookById = exports.getAllBook = exports.deleteBook = exports.createBook = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = _interopRequireWildcard(require("../config/database"));
var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var Book = require('../models/book.js')(_database["default"], _database.DataTypes);
// import bcrypt  from 'bcrypt' ;
// import dotenv from 'dotenv'
// import jwt from 'jsonwebtoken';
// import sendEmail from '../config/sendEmail';

// dotenv.config()

// let otp=''

//create new user
var createBook = exports.createBook = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(body) {
    var book;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Book.create(body);
        case 2:
          book = _context.sent;
          return _context.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: book,
            message: 'Book Succesfully created'
          });
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function createBook(_x) {
    return _ref.apply(this, arguments);
  };
}();
var updateBook = exports.updateBook = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(bookId, body) {
    var book;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Book.findOne({
            where: {
              id: bookId
            }
          });
        case 2:
          book = _context2.sent;
          if (book) {
            _context2.next = 5;
            break;
          }
          return _context2.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: [],
            message: 'Book Not Exit !'
          });
        case 5:
          book.description = body.description;
          book.price = body.price;
          book.quantity = body.quantity;
          book.author = body.author;
          book.imgUrl = body.imgUrl;
          book.discountPrice = body.discountPrice;
          book.bookName = body.bookName ? body.bookName : book.bookName;
          book.save();
          return _context2.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: book,
            message: 'Book Succesfully Update'
          });
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function updateBook(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
var getAllBook = exports.getAllBook = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(body) {
    var book;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          console.log(body);
          _context3.next = 3;
          return Book.findAll();
        case 3:
          book = _context3.sent;
          if (book) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: [],
            message: 'Book not exit !'
          });
        case 8:
          return _context3.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: book,
            message: 'get All Book Succesfully'
          });
        case 9:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function getAllBook(_x4) {
    return _ref3.apply(this, arguments);
  };
}();
var getAllBookById = exports.getAllBookById = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(bookId) {
    var book;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return Book.findOne({
            where: {
              id: bookId
            }
          });
        case 2:
          book = _context4.sent;
          if (book) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: [],
            message: "Book Not Exit!"
          });
        case 7:
          return _context4.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: book,
            message: 'get All Book Succesfully'
          });
        case 8:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function getAllBookById(_x5) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteBook = exports.deleteBook = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(bookId) {
    var book;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return Book.destroy({
            where: {
              id: bookId
            }
          });
        case 2:
          book = _context5.sent;
          if (book) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: [],
            message: "Book Not Exit !"
          });
        case 7:
          return _context5.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: book,
            message: 'book deleted'
          });
        case 8:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function deleteBook(_x6) {
    return _ref5.apply(this, arguments);
  };
}();