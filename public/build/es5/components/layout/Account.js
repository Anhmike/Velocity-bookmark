"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _react = require("react");

var React = _interopRequire(_react);

var Component = _react.Component;
var Header = _interopRequire(require("../../components/Header"));

var connect = require("react-redux").connect;
var Dropzone = _interopRequire(require("react-dropzone"));

var APIManager = _interopRequire(require("../../utils/APIManager"));

var store = _interopRequire(require("../../stores/store"));

var actions = _interopRequire(require("../../actions/actions"));

var Account = (function (Component) {
	function Account(props, context) {
		_classCallCheck(this, Account);

		_get(Object.getPrototypeOf(Account.prototype), "constructor", this).call(this, props, context);
		this.updateUser = this.updateUser.bind(this);
		this.submitUpdate = this.submitUpdate.bind(this);
		this.uploadProfileImage = this.uploadProfileImage.bind(this);
		this.state = {
			user: {
				username: "",
				phone: "",
				image: ""
			}
		};
	}

	_inherits(Account, Component);

	_prototypeProperties(Account, null, {
		componentWillMount: {
			value: function componentWillMount() {
				var userCopy = Object.assign({}, this.props.currentUser);
				console.log("componentWillMount " + JSON.stringify(userCopy));
				this.setState({
					user: userCopy
				});
			},
			writable: true,
			configurable: true
		},
		uploadProfileImage: {
			value: function uploadProfileImage(files) {
				console.log("uploadProfileImage: ");
				var _this = this;
				APIManager.upload(files[0], function (err, response) {
					if (err) {
						alert(err.message);
						return;
					}

					console.log(JSON.stringify(response));
					var updated = Object.assign({}, _this.state.user);
					updated.image = response.id;
					_this.setState({
						user: updated
					});
				});
			},
			writable: true,
			configurable: true
		},
		submitUpdate: {
			value: function submitUpdate(event) {
				event.preventDefault();
				console.log("submitUpdate " + JSON.stringify(this.state.user));
				var endpoint = "/api/profile/" + this.state.user._id;
				APIManager.handlePut(endpoint, this.state.user, function (err, response) {
					if (err) {
						alert(err.message);
						return;
					}

					store.currentStore().dispatch(actions.currentUserReceived(response.result));
					alert("Update Successful!");
				});
			},
			writable: true,
			configurable: true
		},
		updateUser: {
			value: function updateUser(event) {
				event.preventDefault();
				console.log("updateUser: " + event.target.value);
				var updated = Object.assign({}, this.state.user);
				updated[event.target.id] = event.target.value;
				this.setState({
					user: updated
				});
			},
			writable: true,
			configurable: true
		},
		render: {
			value: function render() {
				var img = this.props.currentUser.image.length == 0 ? null : React.createElement("img", { style: { width: 200 }, src: "https://media-service.appspot.com/site/images/" + this.props.currentUser.image + "?crop=400" });
				return React.createElement(
					"div",
					null,
					React.createElement(Header, null),
					React.createElement(
						"section",
						{ id: "content" },
						React.createElement(
							"div",
							{ className: "content-wrap" },
							React.createElement(
								"div",
								{ className: "container clearfix" },
								React.createElement(
									"div",
									{ className: "col_two_third nobottommargin" },
									img,
									React.createElement(
										"h2",
										null,
										"Welcome To Bookmark ",
										this.props.currentUser.username,
										"!"
									),
									React.createElement(
										"h3",
										null,
										"Your Phone Number Is ",
										this.props.currentUser.phone
									),
									React.createElement("input", { onChange: this.updateUser, type: "text", id: "username", name: "login-form-username", value: this.state.user.username, className: "form-control" }),
									React.createElement("input", { onChange: this.updateUser, type: "text", id: "phone", name: "login-form-phone", value: this.state.user.phone, className: "form-control" }),
									" ",
									React.createElement("br", null),
									React.createElement(
										Dropzone,
										{ onDrop: this.uploadProfileImage },
										this.state.user.image.length == 0 ? null : React.createElement("img", { src: "https://media-service.appspot.com/site/images/" + this.state.user.image + "?crop=200" }),
										"Drag & Drop Image Here"
									),
									React.createElement("br", null),
									React.createElement(
										"button",
										{ onClick: this.submitUpdate },
										"Update"
									)
								)
							)
						)
					)
				);
			},
			writable: true,
			configurable: true
		}
	});

	return Account;
})(Component);

var stateToProps = function (state) {
	return {
		currentUser: state.accountReducer.currentUser
	};
};

module.exports = connect(stateToProps)(Account)

//TODO: Make it so after pressing update button to commit changes, the new profile image appears on top
;