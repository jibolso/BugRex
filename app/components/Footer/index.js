import React from 'react';
import Olark from '../Olark/index';
import router from 'react-router';
const Link = require('react-router').Link

export default class Footer extends React.Component {
	render() {
		let authButton,
			account,
			becomeExpert;
		if (this.props.user) {
			authButton = (<span> <a href="/logout">Logout</a> · </span>);
			account = (<span> <a href="/account">Account</a> · </span>);
		} else {
			authButton = (<span> <a href="/auth/github">GitHub Login</a> · </span>);
			becomeExpert = (<span> <a href="https://bugrex.typeform.com/to/Rv5TvD">Become an expert</a> · </span>);
		}
		return (
			<div className="footer">
                <a href="mailto:support@bugrex.com">Email us</a> · 
                <a href="/terms.html"> Terms</a> · 
                {authButton}
                {account} 
                {becomeExpert} 
                Copyright Bonito AS 2016 · Oslo, Norway
            </div>
        );
	}
}
