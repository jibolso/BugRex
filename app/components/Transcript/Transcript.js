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
		const transcriptTitle = this.props.params.transcriptTitle;
		Request.get('/api/transcript/title/' + transcriptTitle)
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
		let expert,
			title,
			previousKind,
			splitter,
			messages,
			allGroupedMessages = [],
			messageGroup = [];

		if (this.state.transcript) {
			messages = this.state.transcript.items.map((item, index) => {
				if (index === 0) previousKind = item.kind;
/*				
				if (previousKind !== item.kind) {
						allGroupedMessages.push(messageGroup);
						messageGroup = [];
						messageGroup.push(item);
						splitter = <br/>;
					} else {
						splitter = null;
						messageGroup.push(item);
					}
				
				previousKind = item.kind;
*/				
				const kind = item.kind === 'MessageToOperator' ? 'visitor': 'operator'
				return (
					<tr key={index} className={'message-' + kind}>
						<td className="nickname">{kind === 'visitor' ? 'Visitor' : item.nickname}: </td>
						<td className="body">
							{item.body}
						</td>
					</tr>
				);
			});
		}

		if (this.state.transcript && this.state.transcript.mainOperator) {
			expert = this.state.transcript.mainOperator;
			title = this.state.transcript.title;
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
			<div>
				<div className="transcript-header">
					<h3 className="operator-username">{expert}</h3>
					<img className="operator-img" src={this.state.expert.profileImg} />
					<h2 className="transcript-title">{title}</h2>
				</div>
           		<table cellSpacing="0">
           			<tbody>
           			{messages}
           			</tbody>
           		</table>
            </div>
        );
	}
}
