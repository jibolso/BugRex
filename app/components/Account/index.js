import ReactDOM from 'react-dom';
import React from 'react';
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
			<div className="account-container">
				<div>
				<h3 className="account-title">{this.props.user.username}</h3>
				<img 
					className="account-img"
					src={this.props.user.profileImg}/>
				<br/>
				<p className="account-completed-chats">Completed chats: {this.props.user.completedChats}</p>
				<textarea
					autoFocus
					className="account-description"
					ref="description"
					defaultValue={this.props.user.description}
					onChange={this.props.handleDescriptionChange}
					/>
				</div>
			</div>
		);
	}
}
