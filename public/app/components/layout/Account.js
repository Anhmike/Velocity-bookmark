import React, {Component} from 'react'
import Header from '../../components/Header'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import APIManager from '../../utils/APIManager'
import store from '../../stores/store'
import actions from '../../actions/actions'

class Account extends Component {

	constructor(props, context){
		super(props, context)
		this.updateUser = this.updateUser.bind(this)
		this.submitUpdate = this.submitUpdate.bind(this)
		this.uploadProfileImage = this.uploadProfileImage.bind(this)
		this.state = {
			user: {
				username:'',
				phone:'',
				image:''
			}
		}
	}

	componentWillMount(){
		var userCopy = Object.assign({}, this.props.currentUser)
		console.log('componentWillMount '+JSON.stringify(userCopy))
		this.setState({
			user: userCopy
		})
	}

	uploadProfileImage(files){
		console.log('uploadProfileImage: ')
		var _this = this
		APIManager.upload(files[0], function(err, response){
			if (err){
				alert(err.message)
				return
			}

			console.log(JSON.stringify(response))
			var updated = Object.assign({}, _this.state.user)
			updated['image'] = response.id
			_this.setState({
				user: updated
			})
		})
	}

	submitUpdate(event){
		event.preventDefault()
		console.log('submitUpdate ' + JSON.stringify(this.state.user))
		var endpoint = '/api/profile/'+this.state.user._id
		APIManager.handlePut(endpoint, this.state.user, function(err, response){
			if (err){
				alert(err.message)
				return
			}

			store.currentStore().dispatch(actions.currentUserReceived(response.result))
			alert('Update Successful!')
		})

	}

	updateUser(event){
		event.preventDefault()
		console.log('updateUser: ' + event.target.value)
		var updated = Object.assign({}, this.state.user)
		updated[event.target.id] = event.target.value
		this.setState({
			user: updated
		})
	}

	render(){
		var img = (this.props.currentUser.image.length == 0) ? null : <img style={{width:200}} src={'https://media-service.appspot.com/site/images/'+this.props.currentUser.image+'?crop=400'} />
		return(
			<div>
				<Header />

		        <section id="content">

		            <div className="content-wrap">
		                <div className="container clearfix">

		                    <div className="col_two_third nobottommargin">
		                    	{img}
		                        <h2>Welcome To Bookmark {this.props.currentUser.username}!</h2>
		                        <h3>Your Phone Number Is {this.props.currentUser.phone}</h3>
		                        <input onChange={this.updateUser} type="text" id="username" name="login-form-username" value={this.state.user.username} className="form-control" />
		                        <input onChange={this.updateUser} type="text" id="phone" name="login-form-phone" value={this.state.user.phone} className="form-control" /> <br />
		                        <Dropzone onDrop={this.uploadProfileImage}>
		                        	{ (this.state.user.image.length == 0) ?
		                        		null
		                        		:
		                        		<img src={'https://media-service.appspot.com/site/images/'+this.state.user.image+'?crop=200'}/>
		                        	}
		                        	Drag & Drop Image Here
		                        </Dropzone>
		                        <br />
		                        <button onClick={this.submitUpdate}>Update</button>
		                    </div>

		                </div>
		            </div>
		        </section>

			</div>
			)
	}
}

const stateToProps = function(state){
	return {
		currentUser: state.accountReducer.currentUser
	}
}

export default connect(stateToProps)(Account)

//TODO: Make it so after pressing update button to commit changes, the new profile image appears on top