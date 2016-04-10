import React from 'react';
import Request from 'superagent';

export default class Transcripts extends React.Component {
	render() {
		return (
			<div className="transcript">
				{this.props.children}
			</div>
		);
	}
}