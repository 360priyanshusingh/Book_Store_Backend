"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _book = _interopRequireDefault(require("./book.route"));
var _user = _interopRequireDefault(require("./user.route"));
var _cart = _interopRequireDefault(require("./cart.route"));
var _wishList = _interopRequireDefault(require("./wishList.route"));
var _order = _interopRequireDefault(require("./order.route"));
var _customerDetails = _interopRequireDefault(require("./customerDetails.route"));
var router = _express["default"].Router();
/**
 * Function contains Application routes
 *
 * @returns router
 */

var routes = function routes() {
  router.get('/', function (req, res) {
    res.json('Welcome');
  });
  router.use('/users', _user["default"]);
  router.use('/books', _book["default"]);
  router.use('/cart', _cart["default"]);
  router.use('/wishList', _wishList["default"]);
  router.use('/order', _order["default"]);
  router.use('/customer', _customerDetails["default"]);
  return router;
};
var _default = exports["default"] = routes;