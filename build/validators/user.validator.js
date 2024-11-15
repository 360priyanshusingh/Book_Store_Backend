"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUserValidator = exports.newPasswordValidator = exports.loginUserValidator = void 0;
var _joi = _interopRequireDefault(require("@hapi/joi"));
var newUserValidator = exports.newUserValidator = function newUserValidator(req, res, next) {
  var schema = _joi["default"].object({
    firstName: _joi["default"].string().min(3).required(),
    lastName: _joi["default"].string().min(3).required(),
    email: _joi["default"].string().email().min(3).required(),
    role: _joi["default"].string(),
    password: _joi["default"].string().min(8).max(15).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).+$')).required()
  });
  var _schema$validate = schema.validate(req.body),
    error = _schema$validate.error,
    value = _schema$validate.value;
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
var loginUserValidator = exports.loginUserValidator = function loginUserValidator(req, res, next) {
  var schema = _joi["default"].object({
    email: _joi["default"].string().email().min(3).required(),
    password: _joi["default"].string().min(8).max(15).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).+$')).required()
  });
  var _schema$validate2 = schema.validate(req.body),
    error = _schema$validate2.error,
    value = _schema$validate2.value;
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
var newPasswordValidator = exports.newPasswordValidator = function newPasswordValidator(req, res, next) {
  var schema = _joi["default"].object({
    otp: _joi["default"].string().min(5),
    newPassword: _joi["default"].string().min(8).max(15).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).+$')).required().messages({
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
      'string.min': 'Password must be at least 8 characters long.',
      'string.max': 'Password must be no more than 15 characters long.'
    })
  });
  var _schema$validate3 = schema.validate(req.body),
    error = _schema$validate3.error,
    value = _schema$validate3.value;
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};