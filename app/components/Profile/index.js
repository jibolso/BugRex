import React from 'react';
import Request from 'superagent';

export default class Profile extends React.Component {

	constructor() {
		super();
		this.state = {
			user: {}
		};
	}

	componentDidMount() {
		const path = this.props.params.username;
		Request.get('/api/user/' + path)
			.then(res => {
				this.setState({
					user: res.body
				});
			});
	}

	render() {
		return (
			<div>
				<p>{this.state.user.username}</p>
				<p>Completed chats: {this.state.user.completedChats}</p>
				<img 
					src={this.state.user.profileImg}/>
			</div>
		);
	}
}