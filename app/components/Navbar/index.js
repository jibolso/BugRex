import ReactDOM from 'react-dom';
import React from 'react';
const Link = require('react-router').Link

export default class Navbar extends React.Component {

	constructor(props){
		super(props);
	}

	render () {
		return (
			<div className="nav">
				<ul>
					<li>
					<Link to="/">
			        	<img className="logo" src="/static/images/logo2@2x.png" />
					</Link>
					</li>
		          	<li>
			          	<Link to="/featured">Experts</Link>
		          	</li>
		          	<li>
			          <a href="https://bugrex.typeform.com/to/Rv5TvD">Become an expert</a>
		      		</li>
		      	</ul>
	      	</div>
		);
	}
}
