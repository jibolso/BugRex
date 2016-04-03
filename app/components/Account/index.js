import ReactDOM from 'react-dom';
import React from 'react';
import Request from 'superagent';
const Link = require('react-router').Link

export default class Account extends React.Component {

	constructor(props){
		super(props);
		this.handleSave = this.handleSave.bind(this);
		this.getTranscripts = this.getTranscripts.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.state = {
			input:'',
			transcripts: []
		}
	}

	getTranscripts(username){
		Request.get('/api/transcripts/' + username)
			.end((err, response) => {
				if (err) {
					throw err;
				}
				if (response) {
					this.setState({
						transcripts: response.body
					});
				}
			})
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.user.username) {
			this.getTranscripts(nextProps.user.username);
		}
	}

	handleSave() {
		this.props.onDescriptionSave();
	}

	handleDescriptionChange(ev){
		ev.preventDefault();
		this.props.onDescriptionChange(ev.target.value);
	}

	render () {
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
					className="account-description"
					ref="description"
					onChange={this.handleDescriptionChange}
					value={this.props.user.description}
					/>
				<input
					className="account-save-button"
					type="submit"
					onClick={this.handleSave}
					value="Save"
					/>
				</div>
				<div>
					<h3 style={{textAlign: 'center'}}>Transcripts</h3>
					<ul className="account-transcript-list">
						{
							this.state.transcripts.map(transcript => {
								return (
									<li key={transcript.id}>
										<a href={'/transcript/' + transcript.id} className="link">
											Transcript
										</a>
									</li>
								);
							})
						}
					</ul>
				</div>
			</div>
		);
	}
}
