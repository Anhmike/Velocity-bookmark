import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import entriesReducer from '../reducers/entriesReducer'
import profilesReducer from '../reducers/profilesReducer'
import accountReducer from '../reducers/accountReducer'


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

var currentStore
export default {

	configureStore: function(initialState){
		// Combine Reducers
		var reducers = combineReducers({
		    entriesReducer: entriesReducer,
		    profilesReducer: profilesReducer,
		    accountReducer: accountReducer
		})

		// Create Store
		var store = createStore(
		    reducers,
		    initialState,
		    applyMiddleware(thunk) // Add middleware to createStore
		)

		currentStore = store
		return currentStore
	},

	currentStore: function(){
		return currentStore
	}


}



