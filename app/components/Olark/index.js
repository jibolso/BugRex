import React from 'react';
import Request from 'superagent';
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'

export default class Olark extends React.Component {
	constructor(){
		super();
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		this.props.onClick();
	}

	render(){
		console.log('olark rendering, this.props:', this.props);
		return (
			<div className="right">
				<div className="live-expert-box">
					<img 
						className="live-expert-img" 
						src={this.props.operator.profileImg} />
					<p className="live-expert-name">
					{this.props.operator.username}
					</p>
					<input 
						className="live-expert-button"
						type="submit"
						value="Profile" 
						onClick={this.handleClick}/>
				</div>
				<div id="olark-box-container">
				</div>
			</div>

	);
	}	
}