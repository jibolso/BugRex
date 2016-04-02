import React from 'react';
import Olark from '../Olark/index';
import router from 'react-router';
const Link = require('react-router').Link

export default class Footer extends React.Component {
	render() {
		let authButton,
			account;
		if (this.props.user) {
			authButton = (<a href="/logout"> Logout ·</a>);
			account = (
			        <a href="/account">Account ·</a>
			);
		} else {
			authButton = (<a href="/auth/github"> GitHub Login </a>);

		}
		return (
			<div className="footer">
                <a href="mailto:support@bugrex.com">Email us</a> · 
                <a href="/terms.html">Terms</a> · 
                {authButton}
                {account} 
                Copyright Bonito AS 2016 · Oslo, Norway
            </div>
        );
	}
}
