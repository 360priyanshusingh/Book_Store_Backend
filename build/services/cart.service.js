"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateQuantity = exports.removeItem = exports.getCartById = exports.deleteItem = exports.deleteCart = exports.addItem = void 0;
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
var Cart = require('../models/cart.js')(_database["default"], _database.DataTypes);
var Book = require('../models/book.js')(_database["default"], _database.DataTypes);
var addItem = exports.addItem = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(body, bookId) {
    var cart, book, bookData, _cart, existingBook, updatedBooks, _book, newBookData;
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
            _context.next = 22;
            break;
          }
          _context.next = 6;
          return Cart.create({
            userId: body.userId
          });
        case 6:
          cart = _context.sent;
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
          cart.totalQuantity = 1;
          cart.totalPrice = book.price;
          cart.totalDiscountPrice = book.discountPrice;
          bookData = {
            id: book.id,
            bookName: book.bookName,
            author: book.author,
            quantity: 1,
            adminId: book.adminId,
            description: book.description,
            price: book.price,
            imgUrl: book.imgUrl,
            discountPrice: book.discountPrice
          };
          cart.books = cart.books || [];
          cart.books = [].concat((0, _toConsumableArray2["default"])(cart.books), [bookData]);
          _context.next = 20;
          return cart.save();
        case 20:
          _context.next = 48;
          break;
        case 22:
          // Check if the book already exists in the cart
          existingBook = (_cart = cart) === null || _cart === void 0 || (_cart = _cart.books) === null || _cart === void 0 ? void 0 : _cart.find(function (book) {
            if (book.id == bookId) {
              return book;
            }
          });
          console.log(existingBook);
          if (!existingBook) {
            _context.next = 36;
            break;
          }
          // If the book already exists, increment its quantity
          updatedBooks = cart.books.map(function (book) {
            if (book.id == bookId) {
              return _objectSpread(_objectSpread({}, book), {}, {
                quantity: book.quantity + 1
              });
            }
            return book;
          });
          cart.setDataValue('books', updatedBooks);
          cart.books = (0, _toConsumableArray2["default"])(updatedBooks);
          cart.totalPrice += parseFloat(existingBook.price);
          cart.totalDiscountPrice += parseFloat(existingBook.discountPrice);
          cart.totalQuantity += 1;
          console.log("Updated cart books", cart.books);
          _context.next = 34;
          return cart.save();
        case 34:
          _context.next = 48;
          break;
        case 36:
          _context.next = 38;
          return Book.findOne({
            where: {
              id: bookId
            }
          });
        case 38:
          _book = _context.sent;
          if (_book) {
            _context.next = 41;
            break;
          }
          return _context.abrupt("return", {
            code: _httpStatusCodes["default"].NOT_FOUND,
            message: 'Book not found'
          });
        case 41:
          newBookData = {
            id: _book.id,
            bookName: _book.bookName,
            author: _book.author,
            quantity: 1,
            adminId: _book.adminId,
            description: _book.description,
            discountPrice: _book.discountPrice,
            imgUrl: _book.imgUrl,
            price: _book.price
          };
          cart.books = [].concat((0, _toConsumableArray2["default"])(cart.books), [newBookData]);
          cart.totalPrice += parseFloat(newBookData.price);
          cart.totalDiscountPrice += parseFloat(newBookData.discountPrice);
          cart.totalQuantity += 1;
          _context.next = 48;
          return cart.save();
        case 48:
          return _context.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: cart,
            message: 'Cart successfully updated'
          });
        case 49:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function addItem(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var updateQuantity = exports.updateQuantity = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(body, bookId) {
    var cart, book, bookData, _cart2, existingBook, updatedBooks, _book2, _bookData;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Cart.findOne({
            where: {
              userId: body.userId
            }
          });
        case 2:
          cart = _context2.sent;
          if (cart) {
            _context2.next = 22;
            break;
          }
          _context2.next = 6;
          return Cart.create({
            userId: body.userId
          });
        case 6:
          cart = _context2.sent;
          _context2.next = 9;
          return Book.findOne({
            where: {
              id: bookId
            }
          });
        case 9:
          book = _context2.sent;
          if (book) {
            _context2.next = 12;
            break;
          }
          return _context2.abrupt("return", {
            code: _httpStatusCodes["default"].NOT_FOUND,
            message: 'Book not found'
          });
        case 12:
          cart.totalQuantity = body.quantity;
          cart.totalPrice = parseFloat(book.price) * parseFloat(body.quantity);
          cart.totalDiscountPrice = parseFloat(book.discountPrice) * parseFloat(body.quantity);
          bookData = {
            id: book.id,
            bookName: book.bookName,
            author: book.author,
            quantity: body.quantity,
            adminId: book.adminId,
            description: book.description,
            price: book.price,
            imgUrl: book.imgUrl,
            discountPrice: book.discountPrice
          };
          cart.books = cart.books || [];
          cart.books = [].concat((0, _toConsumableArray2["default"])(cart.books), [bookData]);
          _context2.next = 20;
          return cart.save();
        case 20:
          _context2.next = 52;
          break;
        case 22:
          // Check if the book already exists in the cart
          existingBook = (_cart2 = cart) === null || _cart2 === void 0 || (_cart2 = _cart2.books) === null || _cart2 === void 0 ? void 0 : _cart2.find(function (book) {
            if (book.id == bookId) {
              return book;
            }
          });
          console.log(existingBook);
          if (!existingBook) {
            _context2.next = 39;
            break;
          }
          // If the book already exists, increment its quantity
          updatedBooks = cart.books.map(function (book) {
            if (book.id == bookId) {
              return _objectSpread(_objectSpread({}, book), {}, {
                quantity: body.quantity
              });
            }
            return book;
          });
          cart.setDataValue('books', updatedBooks);
          cart.books = (0, _toConsumableArray2["default"])(updatedBooks);
          cart.totalPrice -= parseFloat(existingBook.price) * parseFloat(existingBook.quantity);
          cart.totalPrice += parseFloat(existingBook.price) * parseFloat(body.quantity);
          cart.totalDiscountPrice -= parseFloat(existingBook.discountPrice) * parseFloat(existingBook.quantity);
          cart.totalDiscountPrice += parseFloat(existingBook.discountPrice) * parseFloat(body.quantity);
          cart.totalQuantity -= parseFloat(existingBook.quantity);
          cart.totalQuantity += parseFloat(body.quantity);
          console.log("Updated cart books", cart.books);
          _context2.next = 37;
          return cart.save();
        case 37:
          _context2.next = 52;
          break;
        case 39:
          _context2.next = 41;
          return Book.findOne({
            where: {
              id: bookId
            }
          });
        case 41:
          _book2 = _context2.sent;
          if (_book2) {
            _context2.next = 44;
            break;
          }
          return _context2.abrupt("return", {
            code: _httpStatusCodes["default"].NOT_FOUND,
            message: 'Book not found'
          });
        case 44:
          _bookData = {
            id: _book2.id,
            bookName: _book2.bookName,
            author: _book2.author,
            quantity: body.quantity,
            adminId: _book2.adminId,
            description: _book2.description,
            price: _book2.price,
            imgUrl: _book2.imgUrl,
            discountPrice: _book2.discountPrice
          };
          cart.totalQuantity += parseFloat(_bookData.quantity);
          cart.totalPrice += parseFloat(_book2.price) * parseFloat(_bookData.quantity);
          cart.totalDiscountPrice += parseFloat(_book2.discountPrice) * parseFloat(_bookData.quantity);
          cart.books = cart.books || [];
          cart.books = [].concat((0, _toConsumableArray2["default"])(cart.books), [_bookData]);
          _context2.next = 52;
          return cart.save();
        case 52:
          return _context2.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: cart,
            message: 'Cart successfully updated'
          });
        case 53:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function updateQuantity(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var removeItem = exports.removeItem = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(body, bookId) {
    var cart, existingBook, updatedBooks;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return Cart.findOne({
            where: {
              userId: body.userId
            }
          });
        case 2:
          cart = _context3.sent;
          if (cart) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", {
            code: _httpStatusCodes["default"].BAD_REQUEST,
            data: [],
            message: 'Cart not Exit !'
          });
        case 7:
          // Check if the book already exists in the cart
          existingBook = cart.books.find(function (book) {
            if (book.id == bookId) {
              return book;
            }
          });
          console.log(existingBook);
          if (!existingBook) {
            _context3.next = 22;
            break;
          }
          updatedBooks = cart.books.map(function (book) {
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
          cart.setDataValue('books', updatedBooks);
          cart.books = (0, _toConsumableArray2["default"])(updatedBooks);
          cart.totalPrice -= parseFloat(existingBook.price);
          cart.totalDiscountPrice -= parseFloat(existingBook.discountPrice);
          cart.totalQuantity -= 1;
          console.log("Updated cart books", cart.books);
          _context3.next = 20;
          return cart.save();
        case 20:
          _context3.next = 23;
          break;
        case 22:
          return _context3.abrupt("return", {
            code: _httpStatusCodes["default"].BAD_REQUEST,
            data: [],
            message: 'Cart book not Exit !'
          });
        case 23:
          return _context3.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: cart,
            message: 'Book Successfully Remove !'
          });
        case 24:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function removeItem(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var deleteItem = exports.deleteItem = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(body, bookId) {
    var cart, existingBook, updatedBooks;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return Cart.findOne({
            where: {
              userId: body.userId
            }
          });
        case 2:
          cart = _context4.sent;
          if (cart) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", {
            code: _httpStatusCodes["default"].BAD_REQUEST,
            data: [],
            message: 'Cart not Exit !'
          });
        case 7:
          // Check if the book already exists in the cart
          existingBook = cart.books.find(function (book) {
            if (book.id == bookId) {
              return book;
            }
          });
          console.log(existingBook);
          if (!existingBook) {
            _context4.next = 21;
            break;
          }
          updatedBooks = cart.books.filter(function (book) {
            if (book.id != bookId) {
              return book;
            }
          });
          cart.setDataValue('books', updatedBooks);
          cart.books = (0, _toConsumableArray2["default"])(updatedBooks);
          cart.totalPrice -= parseFloat(existingBook.price) * parseFloat(existingBook.quantity);
          cart.totalDiscountPrice -= parseFloat(existingBook.discountPrice) * parseFloat(existingBook.quantity);
          cart.totalQuantity -= parseFloat(existingBook.quantity);
          console.log("Updated cart books", cart.books);
          _context4.next = 19;
          return cart.save();
        case 19:
          _context4.next = 22;
          break;
        case 21:
          return _context4.abrupt("return", {
            code: _httpStatusCodes["default"].BAD_REQUEST,
            data: [],
            message: 'Cart book not Exit !'
          });
        case 22:
          return _context4.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: cart,
            message: 'Book Successfully delete !'
          });
        case 23:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function deleteItem(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteCart = exports.deleteCart = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(userId) {
    var cart;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return Cart.findOne({
            where: {
              userId: userId
            }
          });
        case 2:
          cart = _context5.sent;
          if (cart) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: [],
            message: 'Cart not exit'
          });
        case 7:
          _context5.next = 9;
          return Cart.destroy({
            where: {
              userId: userId
            }
          });
        case 9:
          cart = _context5.sent;
          return _context5.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: cart,
            message: 'Cart successfully deleted'
          });
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function deleteCart(_x9) {
    return _ref5.apply(this, arguments);
  };
}();
var getCartById = exports.getCartById = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(userId) {
    var cart;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return Cart.findOne({
            where: {
              userId: userId
            }
          });
        case 2:
          cart = _context6.sent;
          if (cart) {
            _context6.next = 7;
            break;
          }
          return _context6.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: [],
            message: 'Cart not exit'
          });
        case 7:
          return _context6.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: cart,
            message: 'Get Cart successfully'
          });
        case 8:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function getCartById(_x10) {
    return _ref6.apply(this, arguments);
  };
}();