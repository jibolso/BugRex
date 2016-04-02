import ReactDOM from 'react-dom';
import React from 'react';
import Request from 'superagent';

export default class Account extends React.Component {

	constructor(props){
		super(props);
		this.save = this.save.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.state = {
			input:''
		}
	}

	save() {
		const value = ReactDOM.findDOMNode(this.refs.description).value;
		console.log('value : ', value);
	}

	handleInput(ev){
		this.setState({
			input: ev.target.value
		})
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
				<div
					ref="description"
					contentEditable
					autoFocus
					className="account-description"
					ref="description"
					onInput={this.handleInput}
					onChange={this.handleDescriptionChange}
					>
					{this.props.user.description}
				</div>
				<input
					type="submit"
					onClick={this.save}
					value="Save"
					/>
				</div>
			</div>
		);
	}
}
