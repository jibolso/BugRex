import React from "react";
import Request from 'superagent';

export default class Account extends React.Component {

	constructor(props){
		super(props);
		this.updateUserData = this.updateUserData.bind(this);
		this.change = this.change.bind(this);

		this.state = {
			description: this.props.user.description
		}
	}

	change(key, ev) {
		console.log('change: ', ev.target.value);
		this.setState({
			[key]: ev.target.value
		});
	}

	updateUserData(ev) {
		ev.preventDefault();
		const newDescription = this.refs.description.value;
		Request.put('/api/user')
			.send({
				description: newDescription
			})
			.then(() => {

			});

	}

	render () {
		console.log('this: ', this);
		if (!this.props.user.username) {
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
					value={this.state.description}
					onChange={this.change.bind(this, 'description')}/>
				<input type="submit" />
				</form>
				</div>
			</div>
		);
	}
}
