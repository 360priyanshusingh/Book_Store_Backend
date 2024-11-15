"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var wishListController = _interopRequireWildcard(require("../controllers/wishList.controller.js"));
var _authMiddleware = require("../middlewares/auth.middleware.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
// import { verifyRole } from '../middlewares/verifyRole.middleware.js';

var router = _express["default"].Router();
router.post('/addItem/:id', _authMiddleware.userAuth, wishListController.addItem);
router.post('/removeItem/:id', _authMiddleware.userAuth, wishListController.removeItem);
router["delete"]('/deleteWishList/:id', _authMiddleware.userAuth, wishListController.deleteWishList);
router.get('/getWishList', _authMiddleware.userAuth, wishListController.getWishList);
router["delete"]('/deleteItem/:id', _authMiddleware.userAuth, wishListController.deleteItem);
var _default = exports["default"] = router;