import ReactDOM from 'react-dom';
import React from 'react';
import Request from 'superagent';
const Link = require('react-router').Link

export default class Account extends React.Component {

	constructor(props) {
		super(props);
		this.handleSave = this.handleSave.bind(this);
		this.getTranscripts = this.getTranscripts.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleImgChange = this.handleImgChange.bind(this);
		this.state = {
			input:'',
			transcripts: []
		}
	}

	getTranscripts(username) {
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
		Request
			.put('/api/transcript/' + transcript.id)
			.send({
				transcript: transcript
			})
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
		this.props.onUserSave();
	}

	handleDescriptionChange(ev) {
		ev.preventDefault();
		this.props.onUserChange('description', ev.target.value);
	}

	handleSubmit(transcript, ev) {
		ev.preventDefault();
		this.updateTranscript(transcript);
	}

	handlePublishedChange(transcript, ev) {
		let newTranscripts = this.state.transcripts.map(item => {
			if (transcript.id === item.id) {
				return Object.assign({}, item, {
					published: ev
				});
			} else {
				return item;
			}
		});
		this.setState({
			transcripts: newTranscripts
		});
	}

	handleTitleChange(transcript, ev) {
		let newTranscripts = this.state.transcripts.map(item => {
			if (transcript.id === item.id) {
				return Object.assign({}, item, {
					title: ev.target.value
				});
			} else {
				return item;
			}
		});
		this.setState({
			transcripts: newTranscripts
		});
	}

	handleImgChange(ev) {
		this.props.onUserChange('profileImg', ev.target.value);
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
				<input
					className="account-img-input"
					type="text"
					value={this.props.user.profileImg}
					onChange={this.handleImgChange}/>
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
					value="Save Account Changes"
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
										<form onSubmit={this.handleSubmit.bind(this, transcript)}>
										<input
											className="title-field"
											type="text"
											defaultValue={transcript.title}
											onChange={this.handleTitleChange.bind(this, transcript)}
										/>
										<br/>
										<input
											checked={transcript.published === true}
											name="published"
											type="radio"
											onChange={this.handlePublishedChange.bind(this, transcript, true)}
										/>Publish
										<br/>
										<input
											checked={transcript.published === false}
											name="published"
											type="radio"
											onChange={this.handlePublishedChange.bind(this, transcript, false)}
										/>Unpublish					
										<br/>
										<input
											type="submit"
											value="Save changes"
											onClick={this.updateTranscript.bind(this, transcript)}
										/>
										</form>
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
