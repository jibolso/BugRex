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
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.state = {
			input:'',
			transcripts: []
		}
	}

	getTranscripts(username){
		Request
			.get('/api/transcripts/' + username)
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

	updateTranscript(transcript) {
		console.log('updateTranscript')
		Request
			.put('/api/transcript/' + transcript.id)
			.send(transcript)
			.end((err, response) => {
				console.log('response: ', response);
			});
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

	handlePublishedChange(){

	}

	handleTitleChange(transcript){
		let newState = this.state.transcripts.map(item => {
			if (transcript.id === item.id) {

				return Object.assign({}, item, {
					title: transcript.title
				});
			} else {
				return item;
			}
		});
		console.log('newState; ', newState);
		this.setState(newState);
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
											{transcript.title}
										</a>
										<br/>
										<input
											type="text"
											defaultValue={transcript.title}
											onChange={this.handleTitleChange.bind(this, transcript)}
										/>
										<br/>
										<input
											type="submit"
											value={transcript.published ? 'Unpublish' : 'Publish'}
											onChange={this.handlePublishedChange.bind(this, transcript)}
										/>
										<input
											type="submit"
											value="Save changes"
											onClick={this.updateTranscript.bind(this, transcript)}
										/>
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
