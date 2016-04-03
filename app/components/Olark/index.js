import React from 'react';
import Request from 'superagent';
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'

export default class Olark extends React.Component {
	constructor(){
		super();
	}

	render(){
		let styles = {};
		if (this.props.showOlark === false) {
			styles = {
				display: 'none'
			}
		}
		return (
			<div className="right" style={styles}>
				<div className="live-expert-box">
					<img 
						className="live-expert-img" 
						src={'/' + this.props.operator.profileImg} />
					<p className="live-expert-name">
					{this.props.operator.username}
					</p>
					<input 
						className="live-expert-button"
						type="submit"
						value="View Profile" 
						onClick={this.props.onClick}/>
				</div>
				<div id="olark-box-container">
				</div>
			</div>

	);
	}	
}