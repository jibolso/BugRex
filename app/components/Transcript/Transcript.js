import React from 'react';
import Request from 'superagent';
import router from 'react-router';

export default class Transcript extends React.Component {

	constructor(){
		super();
		this.state = {
			transcript: {},
			ready: false
		};
	}

	componentDidMount(){
		const transcriptId = this.props.params.transcriptId;
		Request.get('/api/transcript/' + transcriptId)
			.end((err, res) => {
				this.setState({
					transcript: res.body,
					ready: true
				});
			});
	}

	render() {
		if (!this.state.ready) {
			return null;
		}

		let previousKind;
		let splitter;
		let messages;
		if (this.state.transcript.items) {
			messages = this.state.transcript.items.map((item, index) => {
				if (previousKind !== item.kind) {
					splitter = <br/>;
				} else {
					splitter = null;
				}
				previousKind = item.kind;
				return (
					<div key={index}>
						{splitter}
						<li
							className={item.kind}>
							{item.body}
						</li>
					</div>
				);
			});
		}
			

		return (
			<div className="transcript">
				<div>
					<h3></h3>
				</div>
           		<ul>
           			{messages}
           		</ul>
            </div>
        );
	}
}
