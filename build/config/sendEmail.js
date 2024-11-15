"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var nodemailer = require("nodemailer");
var dotenv = require('dotenv');
dotenv.config();
var transporter = nodemailer.createTransport({
  service: 'gmail',
  // Specify Gmail service
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS
  }
});

// Email sending function
function sendEmail(_x) {
  return _sendEmail.apply(this, arguments);
}
function _sendEmail() {
  _sendEmail = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var to, subject, html, info;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          to = _ref.to, subject = _ref.subject, html = _ref.html;
          _context.prev = 1;
          _context.next = 4;
          return transporter.sendMail({
            from: "\"".concat(process.env.USER_NAME, "\" <").concat(process.env.USER_EMAIL, ">"),
            // Sender's name and address
            to: to,
            // Recipient(s)
            subject: subject,
            // Subject line
            // text: text,  // Plain text body
            html: html // HTML body
          });
        case 4:
          info = _context.sent;
          console.log("Message sent: %s", info.messageId);
          return _context.abrupt("return", {
            success: true,
            messageId: info.messageId
          });
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          console.error("Error sending email:", _context.t0);
          return _context.abrupt("return", {
            success: false,
            error: _context.t0
          });
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[1, 9]]);
  }));
  return _sendEmail.apply(this, arguments);
}
module.exports = sendEmail;