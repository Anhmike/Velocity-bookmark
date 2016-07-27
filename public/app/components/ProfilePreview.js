import React, { Component } from 'react'
import {Link} from 'react-router'

class ProfilePreview extends Component {

	render() {
		return (
			<div>
			<h3>ProfilePreview for {this.props.currentUser.username}</h3>

			<Link to='/account'> View Account</Link>
			</div>
			)
	}
}

export default ProfilePreview