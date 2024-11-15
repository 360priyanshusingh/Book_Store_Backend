"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.resetPassword = exports.newUser = exports.newAdmin = exports.loginUser = exports.getUser = exports.forgetFassword = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = _interopRequireWildcard(require("../config/database"));
var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _sendEmail = _interopRequireDefault(require("../config/sendEmail"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var User = require('../models/user')(_database["default"], _database.DataTypes);
_dotenv["default"].config();
//get all users
var otp = '';

//create new user
var newUser = exports.newUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(body) {
    var data, hashedPassword, user, emailOptions, emailResult;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return User.findOne({
            where: {
              email: body.email
            }
          });
        case 2:
          data = _context.sent;
          if (!data) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: [],
            message: "User Already present"
          });
        case 7:
          _context.next = 9;
          return _bcrypt["default"].hash(body.password, 4);
        case 9:
          hashedPassword = _context.sent;
          body.password = hashedPassword;
          _context.next = 13;
          return User.create(body);
        case 13:
          user = _context.sent;
          emailOptions = {
            to: user.email,
            subject: 'Welcome to Book Store App !',
            html: "<h3>Thank you ".concat(user.firstName, " ").concat(user.lastName, "  for registration with Book Store App. </h3>") // HTML version
          };
          _context.next = 17;
          return (0, _sendEmail["default"])(emailOptions);
        case 17:
          emailResult = _context.sent;
          if (!emailResult.success) {
            _context.next = 22;
            break;
          }
          console.log('Welcome email sent to:', user.email);
          _context.next = 24;
          break;
        case 22:
          console.error('Failed to send email:', emailResult.error);
          return _context.abrupt("return", {
            code: _httpStatusCodes["default"].BAD_REQUEST,
            data: emailResult.error,
            message: "Registration mail not send to you !"
          });
        case 24:
          return _context.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: user,
            message: 'User Succesfully created'
          });
        case 25:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function newUser(_x) {
    return _ref.apply(this, arguments);
  };
}();
var newAdmin = exports.newAdmin = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(body) {
    var data, hashedPassword, user, emailOptions, emailResult;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return User.findOne({
            where: {
              email: body.email,
              role: 'admin'
            }
          });
        case 2:
          data = _context2.sent;
          if (!data) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: [],
            message: "Admin Already present"
          });
        case 7:
          _context2.next = 9;
          return _bcrypt["default"].hash(body.password, 4);
        case 9:
          hashedPassword = _context2.sent;
          body.password = hashedPassword;
          body.role = 'admin';
          _context2.next = 14;
          return User.create(body);
        case 14:
          user = _context2.sent;
          emailOptions = {
            to: user.email,
            subject: 'Welcome to Book Store App !',
            html: "<h3>Thank you ".concat(user.firstName, " ").concat(user.lastName, "  for registration with Book Store App. </h3>") // HTML version
          };
          _context2.next = 18;
          return (0, _sendEmail["default"])(emailOptions);
        case 18:
          emailResult = _context2.sent;
          if (!emailResult.success) {
            _context2.next = 23;
            break;
          }
          console.log('Welcome email sent to:', user.email);
          _context2.next = 25;
          break;
        case 23:
          console.error('Failed to send email:', emailResult.error);
          return _context2.abrupt("return", {
            code: _httpStatusCodes["default"].BAD_REQUEST,
            data: emailResult.error,
            message: "Registration mail not send to you !"
          });
        case 25:
          return _context2.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: user,
            message: 'Admin Succesfully created'
          });
        case 26:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function newAdmin(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var loginUser = exports.loginUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(body) {
    var data, passwordMatch, token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return User.findOne({
            where: {
              email: body.email
            }
          });
        case 2:
          data = _context3.sent;
          if (!(data === null)) {
            _context3.next = 5;
            break;
          }
          return _context3.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: null,
            message: 'User is not registered !'
          });
        case 5:
          _context3.next = 7;
          return _bcrypt["default"].compare(body.password, data.password);
        case 7:
          passwordMatch = _context3.sent;
          if (passwordMatch) {
            _context3.next = 10;
            break;
          }
          return _context3.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: null,
            message: 'User Password Is Wrong !'
          });
        case 10:
          token = _jsonwebtoken["default"].sign({
            userId: data.id,
            email: data.email,
            role: data.role
          }, process.env.JWT_SECRET_USER);
          return _context3.abrupt("return", {
            code: _httpStatusCodes["default"].CREATED,
            data: token,
            message: 'User successfully Login'
          });
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function loginUser(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var getUser = exports.getUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(body) {
    var data;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return User.findOne({
            where: {
              id: body.userId
            }
          });
        case 2:
          data = _context4.sent;
          if (!(data === null)) {
            _context4.next = 5;
            break;
          }
          return _context4.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: null,
            message: 'User is not registered !'
          });
        case 5:
          return _context4.abrupt("return", {
            code: _httpStatusCodes["default"].CREATED,
            data: data,
            message: 'User successfully Get !'
          });
        case 6:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function getUser(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
var updateUser = exports.updateUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(body) {
    var data;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return User.findOne({
            where: {
              id: body.userId
            }
          });
        case 2:
          data = _context5.sent;
          if (!(data === null)) {
            _context5.next = 5;
            break;
          }
          return _context5.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: null,
            message: 'User is not registered !'
          });
        case 5:
          data.firstName = body.firstName ? body.firstName : data.firstName;
          data.lastName = body.lastName ? body.lastName : data.lastName;
          data.email = body.email ? body.email : data.email;
          data.save();
          return _context5.abrupt("return", {
            code: _httpStatusCodes["default"].CREATED,
            data: data,
            message: 'User successfully Update!'
          });
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function updateUser(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

// export const loginAdmin = async (body) => {

//   const data = await User.findOne({ where: { email: body.email } });
//   if(data===null){
//     return {
//       code: HttpStatus.ACCEPTED, 
//       data: null,
//       message: 'Admin is not registered !',
//     };

//   }
//    const passwordMatch = await bcrypt.compare(body.password, data.password); 

//    if(!passwordMatch){
//      return{
//         code:HttpStatus.ACCEPTED,
//         data:null,
//         message:'admin Password Is Wrong !',
//      };
//   }

//   const token = jwt.sign({
//     userId: data.id,
//     email:data.email,
//     role:data.role
//   }, process.env.JWT_SECRET_ADMIN,{ expiresIn: '1h' });

//   return{
//     code:HttpStatus.CREATED,
//     data:token,
//     message:'Admin successfully Login',
//  };

// };

var forgetFassword = exports.forgetFassword = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(body) {
    var data, i, emailOptions, emailResult;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return User.findOne({
            where: {
              email: body.email
            }
          });
        case 2:
          data = _context6.sent;
          if (data) {
            _context6.next = 7;
            break;
          }
          return _context6.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: null,
            message: "User not registred !"
          });
        case 7:
          for (i = 0; i < 5; i++) {
            otp += Math.floor(Math.random() * 10);
          }
          emailOptions = {
            to: body.email,
            subject: 'Welcome to Book Store App!',
            html: "<h3>Thank you for registration with Book Store App. Your reset password process started . Please do Not share the otp your OTP : ".concat(otp, " </h3>") // HTML version
          };
          _context6.next = 11;
          return (0, _sendEmail["default"])(emailOptions);
        case 11:
          emailResult = _context6.sent;
          if (!emailResult.success) {
            _context6.next = 17;
            break;
          }
          console.log('Welcome email sent to:', body.email);
          return _context6.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: null,
            message: "Otp Generated Please ckeck your mail !"
          });
        case 17:
          console.error('Failed to send email:', emailResult.error);
          return _context6.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: emailResult.error,
            message: "Registration mail not send to you !"
          });
        case 19:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function forgetFassword(_x6) {
    return _ref6.apply(this, arguments);
  };
}();
var resetPassword = exports.resetPassword = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(email, body) {
    var data, hashedPassword;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return User.findOne({
            where: {
              email: email
            }
          });
        case 2:
          data = _context7.sent;
          //  console.log(data);
          console.log(body);
          console.log(otp);
          if (data) {
            _context7.next = 9;
            break;
          }
          return _context7.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: null,
            message: "User not registered !"
          });
        case 9:
          if (!(otp !== body.otp)) {
            _context7.next = 13;
            break;
          }
          return _context7.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: null,
            message: "Otp is wrong !"
          });
        case 13:
          _context7.next = 15;
          return _bcrypt["default"].hash(body.newPassword, 4);
        case 15:
          hashedPassword = _context7.sent;
          data.password = hashedPassword;
          data.save();
          otp = '';
          return _context7.abrupt("return", {
            code: _httpStatusCodes["default"].ACCEPTED,
            data: data,
            message: "Your Password Succesfully Reset !"
          });
        case 20:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function resetPassword(_x7, _x8) {
    return _ref7.apply(this, arguments);
  };
}();