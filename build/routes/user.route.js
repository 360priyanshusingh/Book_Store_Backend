"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var userController = _interopRequireWildcard(require("../controllers/user.controller"));
var _user2 = require("../validators/user.validator");
var _auth = require("../middlewares/auth.middleware");
var _addRole = require("../middlewares/addRole.middleware");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var router = _express["default"].Router();

// Route to create a new user (with validation middleware)
router.post('/signup', _user2.newUserValidator, _addRole.addRole, userController.newUser);
router.post('/signupAdmin', _user2.newUserValidator, _addRole.addRole, userController.newAdmin);
router.post('/login', _user2.loginUserValidator, userController.loginUser);
router.put('/updateUser', _auth.userAuth, userController.updateUser);
router.get('/getUser', _auth.userAuth, userController.getUser);
router.post('/forgetPassword', userController.forgetFassword);
router.post('/resetPassword/:email', _user2.newPasswordValidator, userController.resetPassword);
var _default = exports["default"] = router;