var express = require('express')
var router = express.Router()
var Promise = require('bluebird')


require('node-jsx').install({ extension: ".js" })
var React = require('react')
var ReactRouter = require('react-router')
var ReactDOMServer = require('react-dom/server')

var store = require('../public/build/es5/stores/store')
var ServerApp = require('../public/build/es5/ServerApp')
var Main = require('../public/build/es5/components/Main')
var Home = require('../public/build/es5/components/layout/Home')
var Account = require('../public/build/es5/components/layout/Account')
var Entries = require('../public/build/es5/components/containers/Entries')

// controllers:
var profileController = require('../controllers/ProfileController')
var entryController = require('../controllers/EntryController')


matchRoutes = function(req, routes, initialStore){
	return new Promise(function(resolve, reject){
		ReactRouter.match({ routes, location: req.url }, function(error, redirectLocation, renderProps){
			if (error){
				reject(error)
				return
			}

			// if (redirectLocation){
			// 	return
			// }

			resolve(renderProps)
		})
	})
}

// router.get('/', function(req, res, next) {

// 	var initialStore = null
// 	profileController.find(null)
// 	.then(function(results){
// 		var profilesReducer = {
// 			profiles:{},
// 			profilesArray: results
// 		}

// 		initialStore = store.configureStore({
// 			profilesReducer: profilesReducer
// 		})

// 		var routes = {
// 			path: '/',
// 			component: ServerApp,
// 			initial: initialStore,
// 			indexRoute: {
// 				component: Home
// 			}
// 		}

// 		return matchRoutes(req, routes, initialStore)
// 	})
// 	.then(function(renderProps){
// 		var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))
// 	    res.render('index', {react: html, preloadedState:JSON.stringify(initialStore.getState())})
// 	    return
// 	})
// 	.catch(function(err){

// 	})
// })

router.get('/', function(req, res, next) {

	var initialStore = null
	var reducers = {}

	profileController.findById(req.session.user)
	.then(function(currentUser){

		if (currentUser != null) {
			var accountReducer = {
				currentUser: currentUser.summary()
			}
		}

		reducers['accountReducer'] = accountReducer

		return entryController.find(null)
	})
	.then(function(results){
		var entriesReducer = {
			entries:{},
			entriesArray: results
		}

		reducers['entriesReducer'] = entriesReducer
		initialStore = store.configureStore(reducers)

		var routes = {
			path: '/',
			component: ServerApp,
			initial: initialStore,
			indexRoute: {
				component: Home
			}
		}

		return matchRoutes(req, routes, initialStore)
	})
	.then(function(renderProps){
		var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))
	    res.render('index', {react: html, preloadedState:JSON.stringify(initialStore.getState())})
	    return
	})
	.catch(function(err){

	})
})


router.get('/:page', function(req, res, next) {

	var initialStore = null
	var reducers = {}

	profileController.findById(req.session.user)
	.then(function(currentUser){

		if (currentUser != null) {
			var accountReducer = {
				currentUser: currentUser.summary()
			}

			reducers['accountReducer'] = accountReducer
		}

		initialStore = store.configureStore(reducers)

		var routes = {
			path: '/'+req.params.page,
			component: ServerApp,
			initial: initialStore,
			indexRoute: {
				component: Account
			}
		}

		return matchRoutes(req, routes, initialStore)

	})
	.then(function(renderProps){
		var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))
	    res.render('index', {react: html, preloadedState:JSON.stringify(initialStore.getState())})
	    return
	})
	.catch(function(err) {

	})

})

router.get('/:page/:slug', function(req, res, next) {
	if (req.params.page == 'api'){
		next()
		return
	}

	if (req.params.page == 'account'){
		next()
		return
	}

	var initialStore = null
	entryController.find({phone:req.params.slug})
	.then(function(results){
		var entriesMap = {}
		for (var i=0; i<results.length; i++){
			var entry = results[i]
			var array = entriesMap[entry.phone]
			if (array == null)
				array = []

			array.push(entry)
			entriesMap[entry.phone] = array
		}

		var entriesReducer = {
			entries: entriesMap,
			entriesArray: results
		}

		initialStore = store.configureStore({
			entriesReducer: entriesReducer
		})

		var routes = {
			path: '/:page/:phone',
			component: ServerApp,
			initial: initialStore,
			indexRoute: {
				component: Entries
			}
		}

		return matchRoutes(req, routes, initialStore)		
	})
	.then(function(renderProps){
		var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))
	    res.render('index', {react: html, preloadedState:JSON.stringify(initialStore.getState())})
	    return
	})
	.catch(function(error){

	})
})


module.exports = router;
