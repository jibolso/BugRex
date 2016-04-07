import React from 'react';
import Request from 'superagent';
import router from 'react-router';

export default class Transcript extends React.Component {

	constructor() {
		super();
		this.state = {
			transcript: {},
			expert: {
				profileImg: ''
			},
			ready: false
		};
		this.getUser = this.getUser.bind(this);
	}

	componentDidMount() {
		const transcriptId = this.props.params.transcriptId;
		Request.get('/api/transcript/' + transcriptId)
			.end((err, res) => {
				this.setState({
					transcript: res.body,
					ready: true
				}, () => {
					this.getUser();
				});
			});
	}

	getUser() {
		const username = this.state.transcript.mainOperator;
		Request.get('/api/user/' + username)
			.end((err, res) => {
				this.setState({
					expert: res.body
				});
			});
	}

	render() {
		if (!this.state.ready) {
			return null;
		}
		let expert;
		let previousKind;
		let splitter;
		let messages;

		let allGroupedMessages = [];
		let messageGroup = [];
		if (this.state.transcript.items) {
			messages = this.state.transcript.items.map((item, index) => {
				if (index === 0) previousKind = item.kind;
				if (previousKind !== item.kind) {
						allGroupedMessages.push(messageGroup);
						messageGroup = [];
						messageGroup.push(item);
						splitter = <br/>;
					} else {
						splitter = null;
						console.log()
						messageGroup.push(item);
					}

				
				previousKind = item.kind;
				return (
					<div key={index}>
						{splitter}
						<div className="message">
							<li>
								{item.body}
							</li>
						</div>
					</div>
				);
			});
		}
		console.log('allGroupedMessages: ', allGroupedMessages);
		if (this.state.transcript && this.state.transcript.mainOperator) {
			expert = this.state.transcript.mainOperator;
		}

		let allGroupedMessagesHTML = allGroupedMessages.map(groupedMessage => {
			let group = groupedMessage.map((singleMessage,index) => {
				return (
					<p
						key={index}
						className="single-message">
						{singleMessage.body}
					</p>
				);
			});
			return (
				<li 
					className="grouped-message"
					key={groupedMessage[0].timestamp}>
					{group}
				</li>
			);
		});

		return (
			<div className="transcript">
				<div>
					<h3 className="expert-username">{expert}</h3>
					<img className="expert-img" src={this.state.expert.profileImg} />
				</div>
           		<ul>
           			{allGroupedMessagesHTML}
           		</ul>
            </div>
        );
	}
}
