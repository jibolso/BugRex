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
					let transcripts = response.body.map(transcript => {
						transcript.isEditing = false;
						return transcript;
					})
					this.setState({
						transcripts: transcripts
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
		this.props.onUserSave();
	}

	handleDescriptionChange(ev) {
		ev.preventDefault();
		this.props.onUserChange('description', ev.target.value);
	}

	handleSaveTranscript(transcript, ev) {
		console.log('handleSaveTranscript');
		if (ev && ev.preventDefault) {
			ev.preventDefault();
		}
		Request
			.put('/api/transcript/' + transcript.id)
			.send({
				transcript: transcript
			})
			.end((err, response) => {
				this.toggleEdit(transcript);
			});
	}

	handleDeleteTranscript(transcript, ev) {
		if (ev && ev.preventDefault) {
			ev.preventDefault();
		}
		Request
			.delete('/api/transcript/' + transcript.id)
			.send({
				transcript: transcript
			})
			.end((err, response) => {
				const newTranscripts = this.state.transcripts.filter(t => {
					return t.id !== transcript.id;
				});
				this.setState({
					transcripts: newTranscripts
				});
			});
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

	isValid(str) {
		return /^[a-zA-Z0-9\s]*$/.test(str);
	}

	handleTitleChange(transcript, ev) {
		if (ev && ev.preventDefault) {
			ev.preventDefault();
		}
		const isValid = this.isValid(ev.target.value);
		if (!isValid) {
			return false;
		}
		const newTranscripts = this.state.transcripts.map((item, index) => {
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

	toggleEdit(transcript, ev){
		if (ev && ev.preventDefault) {
			ev.preventDefault();
		}		
		const newTranscripts = this.state.transcripts.map(t => {
			if (t.id === transcript.id) {
				return Object.assign({}, t, {
					isEditing: !t.isEditing
				});
			}
			return t;
		});
		this.setState({
			transcripts: newTranscripts
		})
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
				<p className="account-completed-chats">Completed chats: {this.props.user.completedChats}</p>
				<p>Image link:</p>
				<input
					className="account-img-input"
					type="text"
					value={this.props.user.profileImg}
					onChange={this.handleImgChange}/>
				<br/>
				<p>Description:</p>
				<textarea
					className="account-description"
					ref="description"
					onChange={this.handleDescriptionChange}
					value={this.props.user.description} />
				<input
					className="account-save-button"
					type="submit"
					onClick={this.handleSave}
					value="Save Account Changes" />
				</div>
				<div>
					<h3 style={{textAlign: 'center'}}>Transcripts</h3>
					<ul className="account-transcript-list">
						{
							this.state.transcripts.map((transcript, index) => {
								if (transcript.title) {
									if (transcript.isEditing) {
										return (
											<li key={transcript.id}>
												<form>
													<input
														className="title-field"
														type="text"
														value={transcript.title}
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
														value="Delete"
														onClick={this.handleDeleteTranscript.bind(this, transcript)} />
													<input
														type="submit"
														value="Save changes"
														onClick={this.handleSaveTranscript.bind(this, transcript)} />
													<input
														type="submit"
														value="Cancel"
														onClick={this.toggleEdit.bind(this, transcript)} />	
												</form>
											</li>
										);
									} else {
										let unpublished = transcript.published ? '' : 'unpublished';
										return (
											<li key={transcript.id}>
												<a className={"link " +  unpublished} href={'/transcript/' + transcript.title.split(' ').join('-')} >
													{transcript.title}
												</a>
												<span> </span>
												<span className="ion-edit edit" styles={{color: 'white'}} onClick={this.toggleEdit.bind(this, transcript)}></span>
											</li>
										);
									}	
								}
							})
						}
					</ul>
				</div>
			</div>
		);
	}
}
