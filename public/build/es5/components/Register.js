"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var APIManager = _interopRequire(require("../utils/APIManager"));

var store = _interopRequire(require("../stores/store"));

var actions = _interopRequire(require("../actions/actions"));

var Register = (function (Component) {
	function Register(props, context) {
		_classCallCheck(this, Register);

		_get(Object.getPrototypeOf(Register.prototype), "constructor", this).call(this, props, context);
		this.toggleMode = this.toggleMode.bind(this);
		this.updateVisitor = this.updateVisitor.bind(this);
		this.submit = this.submit.bind(this);
		this.register = this.register.bind(this);
		this.login = this.login.bind(this);
		this.state = {
			mode: "register", // register or login
			visitor: {
				username: "",
				phone: "",
				password: ""
			}
		};
	}

	_inherits(Register, Component);

	_prototypeProperties(Register, null, {
		updateVisitor: {
			value: function updateVisitor(event) {
				//		console.log(event.target.id+' = '+event.target.value)
				var updatedVisitor = Object.assign({}, this.state.visitor);
				updatedVisitor[event.target.id] = event.target.value;

				this.setState({
					visitor: updatedVisitor
				});
			},
			writable: true,
			configurable: true
		},
		submit: {
			value: function submit() {
				if (this.state.mode == "register") {
					this.register();
				} else {
					this.login();
				}
			},
			writable: true,
			configurable: true
		},
		login: {
			value: function login() {
				console.log("LOGIN: " + JSON.stringify(this.state.visitor));
				if (this.state.visitor.username.length == 0) {
					alert("Please Enter a Username");
					return;
				}

				if (this.state.visitor.password.length == 0) {
					alert("Please Enter a Password");
					return;
				}

				APIManager.handlePost("/account/login", this.state.visitor, function (err, response) {
					if (err) {
						alert(err.message);
						return;
					}

					console.log("POST: " + JSON.stringify(response));
					store.currentStore().dispatch(actions.currentUserReceived(response.user));
				});

			},
			writable: true,
			configurable: true
		},
		register: {
			value: function register() {
				if (this.state.visitor.username.length == 0) {
					alert("Please Enter a Username");
					return;
				}

				if (this.state.visitor.phone.length == 0) {
					alert("Please Enter Your Phone Number");
					return;
				}

				if (this.state.visitor.password.length == 0) {
					alert("Please Enter a Password");
					return;
				}

				APIManager.handlePost("/api/profile", this.state.visitor, function (err, response) {
					if (err) {
						alert(err.message);
						return;
					}

					console.log("POST: " + JSON.stringify(response));
				});
			},
			writable: true,
			configurable: true
		},
		toggleMode: {
			value: function toggleMode(event) {
				event.preventDefault();

				var currentMode = this.state.mode;
				var nextMode = currentMode == "register" ? "login" : "register";
				console.log("Toggle Mode: " + nextMode);
				this.setState({
					mode: nextMode
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var btnText = null;
				var phoneField = null;
				if (this.state.mode == "register") {
					btnText = "Join";
					phoneField = React.createElement("input", { type: "text", onChange: this.updateVisitor, style: { marginTop: 22 }, id: "phone", name: "login-form-phone", placeholder: "Phone", className: "form-control" });
				} else {
					btnText = "Log In";
				}

				return React.createElement(
					"div",
					{ className: "well well-lg nobottommargin" },
					React.createElement(
						"h3",
						null,
						this.state.mode.toUpperCase()
					),
					React.createElement("hr", { style: { borderTop: "1px solid #777" } }),
					React.createElement(
						"div",
						{ className: "col_full" },
						React.createElement("input", { type: "text", onChange: this.updateVisitor, id: "username", name: "login-form-username", placeholder: "Username", className: "form-control" }),
						phoneField,
						React.createElement("input", { type: "password", onChange: this.updateVisitor, style: { marginTop: 22 }, id: "password", name: "login-form-password", placeholder: "password", className: "form-control" })
					),
					React.createElement(
						"button",
						{ onClick: this.submit, className: "button button-xlarge button-border button-rounded tright" },
						btnText
					),
					React.createElement("br", null),
					"Already a member? Login ",
					React.createElement(
						"a",
						{ onClick: this.toggleMode, href: "#" },
						"HERE"
					),
					".",
					React.createElement("br", null)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Register;
})(Component);

module.exports = Register;