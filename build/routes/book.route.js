"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var bookController = _interopRequireWildcard(require("../controllers/book.controller.js"));
var _authMiddleware = require("../middlewares/auth.middleware.js");
var _verifyRoleMiddleware = require("../middlewares/verifyRole.middleware.js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
// import { newUserValidator ,loginUserValidator,newPasswordValidator } from '../validators/user.validator';
// import { userAuth } from '../middlewares/auth.middleware';

var router = _express["default"].Router();

// Route to create a new user (with validation middleware)
router.post('/createBook', _authMiddleware.userAuth, _verifyRoleMiddleware.verifyRole, bookController.createBook);
router.put('/updateBook/:id', _authMiddleware.userAuth, _verifyRoleMiddleware.verifyRole, bookController.updateBook);
router.get('/getAllBook', bookController.getAllBook);
router.get('/getAllBookById/:id', bookController.getAllBookById);
router["delete"]('/deleteBook/:id', _authMiddleware.userAuth, _verifyRoleMiddleware.verifyRole, bookController.deleteBook);
var _default = exports["default"] = router;