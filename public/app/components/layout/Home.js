import React, { Component } from 'react'
import { Link } from 'react-router'
import APIManager from '../../utils/APIManager'
import store from '../../stores/store'
import actions from '../../actions/actions'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import Register from '../../components/Register'
import EntryPreview from '../../components/EntryPreview'
import ProfilePreview from '../../components/ProfilePreview'


class Home extends Component {

	constructor(props, context){
		super(props, context)
		this.state = {

		}
	}

	componentDidMount(){
		console.log('componentDidMount: ')
		
	}

	render(){
		var entriesList = this.props.entries.map(function(entry, i){
			return (
				<EntryPreview key={entry._id} entry={entry}/>
			)

		})

		var rightCol = (this.props.currentUser._id == null) ? <Register /> : <ProfilePreview currentUser={this.props.currentUser} />
		return (
			<div>
				<Header />

		        <section id="content">

		            <div className="content-wrap">
		                <div className="container clearfix">

		                    <div className="col_two_third nobottommargin">
		                        <h3>Welcome To Bookmark!</h3>
		                        <div id="posts" className="events small-thumbs">
			                        {entriesList}
		                        </div>
		                    </div>

		                    <div style={{position:'fixed', right:36}} className="col_one_third col_last nobottommargin">
		                    	{rightCol}
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
//		profiles: state.profilesReducer.profilesArray
		entries: state.entriesReducer.entriesArray,
		currentUser: state.accountReducer.currentUser
	}
}

export default connect(stateToProps)(Home)
