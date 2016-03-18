import React from "react";
import Request from 'superagent';

export default class Account extends React.Component {

	constructor(props){
		super(props);

	}

	render () {
		console.log('account this.props.user: ', this.props.user);
		if (!this.props.user) {
			return null;
		}
		return (
			<div>
				<div>
				<form onSubmit={this.updateUserData}>
				<h5>{this.props.user.username}</h5>
				<img 
					className="profile-img img-small"
					src={this.props.user.profileImg}/>
				<br/>
				<textarea
					ref="description"
					defaultValue={this.props.user.description}
					onChange={this.props.handleDescriptionChange}
					/>
				</form>
				</div>
			</div>
		);
	}
}
