"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _redux = require("redux");

var createStore = _redux.createStore;
var applyMiddleware = _redux.applyMiddleware;
var combineReducers = _redux.combineReducers;
var thunk = _interopRequire(require("redux-thunk"));

var entriesReducer = _interopRequire(require("../reducers/entriesReducer"));

var profilesReducer = _interopRequire(require("../reducers/profilesReducer"));

var accountReducer = _interopRequire(require("../reducers/accountReducer"));




// // Combine Reducers
// var reducers = combineReducers({
//     entriesReducer: entriesReducer,
//     profilesReducer: profilesReducer
// })

// // Create Store
// var store = createStore(
//     reducers,
//     applyMiddleware(thunk) // Add middleware to createStore
// )


// export default store

var currentStore;
module.exports = {

	configureStore: function (initialState) {
		// Combine Reducers
		var reducers = combineReducers({
			entriesReducer: entriesReducer,
			profilesReducer: profilesReducer,
			accountReducer: accountReducer
		});

		// Create Store
		var store = createStore(reducers, initialState, applyMiddleware(thunk) // Add middleware to createStore
		);

		currentStore = store;
		return currentStore;
	},

	currentStore: function () {
		return currentStore;
	}


};