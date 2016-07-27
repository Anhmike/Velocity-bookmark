import constants from '../constants/constants'

var initialState = {
	currentUser: {}
}

export default function(state = initialState, action){
	switch (action.type) {

		case constants.CURRENT_USER_RECEIVED:
			console.log('CURRENT_USER_RECEIVED')
			var currentUser = action.currentUser
			var newState = Object.assign({}, state)
			newState['currentUser'] = currentUser
			return newState

		default:
			return state
	}

}