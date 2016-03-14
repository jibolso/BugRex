import React from 'react';
import Request from 'superagent';

export default class Profile extends React.Component {
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}