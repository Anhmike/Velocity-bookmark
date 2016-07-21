var express = require('express')
var router = express.Router()
var profileController = require('../controllers/ProfileController')
var bcrypt = require('bcryptjs')

router.post('/:action', function(req, res, next) {
	var action = req.params.action

	if (action == 'login'){
		var username = req.body.username

		profileController.get({username:username}, true, function(err, profiles){
			if (err){
				res.json({
					confirmation: 'fail',
					message: err
				})
				return
			}

			if (profiles.length == 0){
				res.json({
					confirmation: 'fail',
					message: 'User not found'
				})

				return
			}

			var user = profiles[0]
			var isPasswordCorrect =  bcrypt.compareSync(req.body.password, user.password)
			if (isPasswordCorrect == false){
				res.json({
					confirmation: 'fail',
					message: 'Wrong password'
				})

				return
			}

			req.session.user = user._id // install session cookie to remember
			res.json({
				confirmation: 'success',
				user: user.summary()
			})

			return
		})
	}

})

router.get('/:action', function(req, res, next) {
	var action = req.params.action

	if (action == 'logout'){
		req.session.reset()
		res.json({
			confirmation:'success'
		})
	}


	if (action == 'currentuser'){
		if (req.session == null){
			res.json({
				confirmation:'fail',
				message: 'User not logged in'
			})

			return
		}

		if (req.session.user == null){
			res.json({
				confirmation:'fail',
				message: 'User not logged in'
			})

			return
		}		


		profileController.getById(req.session.user, false, function(err, user){
			if (err){
				res.json({
					confirmation:'fail',
					message: 'User Not Found'
				})

				return
			}

			res.json({
				confirmation:'success',
				user: user.summary()
			})

			return
		})
	}
})

module.exports = router
