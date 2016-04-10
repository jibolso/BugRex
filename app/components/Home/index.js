import React from 'react';
import Olark from '../Olark/index';
import router from 'react-router';
import Footer from '../Footer';
const Link = require('react-router').Link

export default class Home extends React.Component {
	constructor(){
		super();
		this.update = this.update.bind(this);
		this.state = {
			expert: {
				profileImg: 'https://avatars.githubusercontent.com/u/2429547?v=3',
				name: 'Per Harald Borgen'
			}
		};
	}

	update(){
		let expert = getExpert();
		Request.get('api/expert/' +  expert)
	    	.end( (err, res) => {
		    	this.setState({
		    		expert: res.body[0]
		    	});
    	});
	}
	render(){
		return (
			<div className="left">
		    	<div className="left-content hero">
			      	<div className="hero-content">
				          <h1 className="headline">Get Free Coding Help Right Now</h1>
				          <p className="tagline">The BugRex chat is operated by a commmunity of <Link className="link" to="/featured">developers</Link> who truly enjoy helping others. Use it to understand new concepts, ask questions or fix annoying bugs.</p>
				          <p className="tagline">Check out this <Link className="link" to="/transcript/Link-to-Slick-Carusel-CSS-stylesheet-in-React-app">chat transcript</Link> to get a feeling of how it works.</p>
				          <p className="second-tagline" className="tagline"></p>
			        </div>
			    </div>
			    <div className="faq-section">
					<div className="left-content">
						<h2>WHY BUGREX?</h2>
						<p>Googling to solve a coding problem can be frustrating. Sometimes it's better to instantly talk to an <a className="link" href="/featured">expert.</a></p>
						<p>Whether that is to ask newbie questions, let an expert teach you something you don't understand, or get help to fix annoying bugs.</p>
						<h2 className="sub-title">HOW IT WORKS</h2>
						<p>Simply type something into the chat form to get started. Our bot will ask you a couple of questions to make sure you'll be connected with a developer with the right skillset to help you.</p>
						<p>If a suitable expert is live and want to help you, you'll get connected within two minutes.</p>
						<h2 className="sub-title">WHAT WE CAN HELP YOU WITH</h2>          
						<ul className="coding-icons">
				            <li>HTML</li>
				            <li>CSS</li>
				            <li>JavaScript</li>
				            <li>PHP</li>
				            <li>Java</li>
				            <li>jQuery</li>
				            <li>React.js</li>
		          		</ul>
						<h2 className="faq sub-title">FAQ</h2>
						<ol>
							<li>I can't see the chat?</li>
							<p>The chat is supposed to be on the right on desktop/tablet and on the very bottom on mobile. If it's not, something is wrong. The best suggestion is to disable your ad blocker. We're currently using Olarks excellent chat-service, but reports say it doesn't work with ad blockers enabled. If disabling ad blockers doesn't fix it, try another browser. If that doesn't fix it, we're happy if you send us an email to <a className="link" href="mailto:support@bugrex.com">support@bugrex.com</a></p>
							<li>Is it really free?</li>
							<p>Yes. BugRex is operated by developers who truly enjoy helping other people out.</p>
							<li>Is it only over chat?</li>
							<p>It's up to you and the expert. If you want to talk over voice or video, the expert might send you a link, so you can talk there. But all communication starts with the chat.</p>
							<li>Can I become an expert?</li>
							<p>If you're interested in working an expert, hit the 'Become an Expert' button at the top of the site.</p>
							<li>Who are you?</li>
							<p>We are a startup from Norway who believe it should be an easier to find help when you're stuck with a coding issue. If you have questions you can contact us at <a className="link" href="mailto:support@bugrex.com">support@bugrex.com</a>. Read more about the <a className="link" href="https://medium.com/learning-new-stuff/creating-a-two-sided-marketplace-in-two-days-4482dfc1ead8">BugRex story here.</a></p>
							<li>Why haven't I tried it yet?</li>
							<p>You'll have to ask yourself that. It's really super easy to try it out to the right (desktop/tablet) and to the bottom (mobile).</p>
						</ol>
						<div className="partners">
							<h3 className="partners-title">Sponsored by:</h3>
							<a href="http://www.olark.com?utm_campaign=BugRex&utm_source=Partners"> <img className="olark" src="static/images/olark.png"/>
							</a>
						</div>
						<Footer {...this.props} />
					</div>
				</div>
			</div>
		);
	}
}
