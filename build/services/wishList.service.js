"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeItem = exports.getWishList = exports.deleteWishList = exports.deleteItem = exports.addItem = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = _interopRequireWildcard(require("../config/database"));
var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var WishList = require('../models/wishList.js')(_database["default"], _database.DataTypes);
var Book = require('../models/book.js')(_database["default"], _database.DataTypes);
var addItem = exports.addItem = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(body, bookId) {
    var wishList, book, bookData, existingBook, updatedBooks, _book, newBookData;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return WishList.findOne({
            where: {
              userId: body.userId
            }
          });
        case 2:
          wishList = _context.sent;
          if (wishList) {
            _context.next = 19;
            break;
          }
          _context.next = 6;
          return WishList.create({
            userId: body.userId
          });
        case 6:
          wishList = _context.sent;
          _context.next = 9;
          return Book.findOne({
            where: {
              id: bookId
            }
          });
        case 9:
          book = _context.sent;
          if (book) {
            _context.next = 12;
            break;
          }
          return _context.abrupt("return", {
            code: _httpStatusCodes["default"].NOT_FOUND,
            message: 'Book not found'
          });
        case 12:
          bookData = {
            id: book.id,
            bookName: book.bookName,
            author: book.author,
            quantity: 1,
            adminId: book.adminId,
            description: book.description,
            price: book.price,
            discountPrice: book.discountPrice,
            imgUrl: book.imgUrl
          };
          wishList.books = wishList.books || [];
          wishList.books = [].concat((0, _toConsumableArray2["default"])(wishList.books), [bookData]);
          _context.next = 17;
          return wishList.save();
        case 17:
          _context.next = 39;
          break;
        case 19:
          // Check if the book already exists in the cart
          existingBook = wishList.books.find(function (book) {
            if (book.id == bookId) {
              return book;
            }
          });
          console.log(existingBook);
          if (!existingBook) {
            _context.next = 30;
            break;
          }
          // If the book already exists, increment its quantity
          updatedBooks = wishList.books.map(function (book) {
            if (book.id == bookId) {
              return _objectSpread(_objectSpread({}, book), {}, {
                quantity: book.quantity + 1
              });
            }
            return book;
          });
          wishList.setDataValue('books', updatedBooks);
          wishList.books = (0, _toConsumableArray2["default"])(updatedBooks);
          console.log("Updated cart books", wishList.books);
          _context.next = 28;
          return wishList.save();
        case 28:
          _context.next = 39;
          break;
        case 30:
          _context.next = 32;
          return Book.findOne({
            where: {
              id: bookId
            }
          });
        case 32:
          _book = _context.sent;
          if (_book) {
            _context.next = 35;
            break;
          }
          return _context.abrupt("return", {
            code: _httpStatusCodes["default"].NOT_FOUND,
            message: 'Book not found'
          });
        case 35:
          newBookData = {
            id: _book.id,
            bookName: _book.bookName,
            author: _book.author,
            quantity: 1,
            adminId: _book.adminId,
            description: _book.description,
            price: _book.price,
            imgUrl: _book.imgUrl
          };
          wishList.books = [].concat((0, _toConsumableArray2["default"])(wishList.books), [newBookData]);
          _context.next = 39;
          return wishList.save();
        case 39:
          return _context.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: wishList,
            message: 'WishList successfully updated'
          });
        case 40:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function addItem(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var removeItem = exports.removeItem = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(body, bookId) {
    var wishList, existingBook, updatedBooks;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return WishList.findOne({
            where: {
              userId: body.userId
            }
          });
        case 2:
          wishList = _context2.sent;
          if (wishList) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", {
            code: _httpStatusCodes["default"].BAD_REQUEST,
            data: [],
            message: 'WishList not Exit !'
          });
        case 7:
          existingBook = wishList.books.find(function (book) {
            if (book.id == bookId) {
              return book;
            }
          });
          console.log(existingBook);
          if (!existingBook) {
            _context2.next = 19;
            break;
          }
          updatedBooks = wishList.books.map(function (book) {
            if (book.id == bookId) {
              return _objectSpread(_objectSpread({}, book), {}, {
                quantity: book.quantity - 1
              });
            }
            return book;
          });
          updatedBooks = updatedBooks.filter(function (book) {
            if (book.quantity > 0) {
              return book;
            }
          });
          wishList.setDataValue('books', updatedBooks);
          wishList.books = (0, _toConsumableArray2["default"])(updatedBooks);
          console.log("Updated cart books", wishList.books);
          _context2.next = 17;
          return wishList.save();
        case 17:
          _context2.next = 20;
          break;
        case 19:
          return _context2.abrupt("return", {
            code: _httpStatusCodes["default"].BAD_REQUEST,
            data: [],
            message: 'wishList book not Exit !'
          });
        case 20:
          return _context2.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: wishList,
            message: 'wishList Successfully Remove !'
          });
        case 21:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function removeItem(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var deleteWishList = exports.deleteWishList = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(userId) {
    var wishList;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return WishList.findOne({
            where: {
              userId: userId
            }
          });
        case 2:
          wishList = _context3.sent;
          if (wishList) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: [],
            message: 'WishList not exit'
          });
        case 7:
          _context3.next = 9;
          return WishList.destroy({
            where: {
              userId: userId
            }
          });
        case 9:
          wishList = _context3.sent;
          return _context3.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: wishList,
            message: 'WishList successfully deleted'
          });
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function deleteWishList(_x5) {
    return _ref3.apply(this, arguments);
  };
}();
var getWishList = exports.getWishList = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(userId) {
    var wishList;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return WishList.findOne({
            where: {
              userId: userId
            }
          });
        case 2:
          wishList = _context4.sent;
          if (wishList) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: [],
            message: 'WishList not exit'
          });
        case 7:
          return _context4.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: wishList,
            message: 'WishList Successfully Get!'
          });
        case 8:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function getWishList(_x6) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteItem = exports.deleteItem = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(body, bookId) {
    var wishList, existingBook, updatedBooks;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          console.log(body);
          _context5.next = 3;
          return WishList.findOne({
            where: {
              userId: body.userId
            }
          });
        case 3:
          wishList = _context5.sent;
          console.log(wishList);
          if (wishList) {
            _context5.next = 9;
            break;
          }
          return _context5.abrupt("return", {
            code: _httpStatusCodes["default"].BAD_REQUEST,
            data: [],
            message: 'WishList not Exit !'
          });
        case 9:
          // Check if the book already exists in the cart
          existingBook = wishList.books.find(function (book) {
            if (book.id == bookId) {
              return book;
            }
          });
          console.log(existingBook);
          if (!existingBook) {
            _context5.next = 20;
            break;
          }
          updatedBooks = wishList.books.filter(function (book) {
            if (book.id != bookId) {
              return book;
            }
          });
          wishList.setDataValue('books', updatedBooks);
          wishList.books = (0, _toConsumableArray2["default"])(updatedBooks);
          console.log("Updated wishList books", wishList.books);
          _context5.next = 18;
          return wishList.save();
        case 18:
          _context5.next = 21;
          break;
        case 20:
          return _context5.abrupt("return", {
            code: _httpStatusCodes["default"].BAD_REQUEST,
            data: [],
            message: 'WishList book not Exit !'
          });
        case 21:
          return _context5.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: wishList,
            message: 'Book Successfully delete !'
          });
        case 22:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function deleteItem(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();