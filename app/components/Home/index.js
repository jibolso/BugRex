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
				          <h1 className="headline">Get free coding help right now</h1>
				          <p className="tagline">Chat with a professional developer to understand new concepts, ask questions or fix annoying bugs. No money involved.</p>
				          <p className="second-tagline" className="tagline"></p>
			        </div>
			    </div>
			    <div className="faq-section">
					<div className="left-content">
						<h2>WHAT WE CAN HELP YOU WITH</h2>          
						<ul className="coding-icons">
				            <li>HTML/CSS</li>
				            <li>JavaScript</li>
				            <li>PHP</li>
				            <li>Java</li>
				            <li>jQuery</li>
				            <li>React.js</li>
		          		</ul>
		          		<h2>HOW IT WORKS</h2>
						<p className="how-it-works-body">Googling to solve a problem is a not always the easiest. Sometimes it's really nice to be able to instantly talk to a real person about your problems. Whether that is to ask the newbie questions you don't dare to ask other places, let an expert teach you something you don't fully understand, or let the expert help you fix annoying bugs. We recommend you try the chat, and experience what it's like.</p>
						<h2 className="faq">FAQ</h2>
						<ol>
							<li>I can't see the chat?</li>
							<p>The chat is supposed to be on the right on desktop/tablet and on the very bottom on mobile. If it's not, something is wrong. The best suggestion is to disable your ad blocker. We're currently using Olarks excellent chat-service, but reports say it doesn't work with ad blockers enabled. If disabling ad blockers doesn't fix it, try another browser. If that doesn't fix it, we're happy if you send us an email to <a className="link" href="mailto:support@bugrex.com">support@bugrex.com</a></p>
							<li>How do I know I'm not talking to a robot?</li>
							<p>Maybe you are, maybe not. The only way to find out is to try it out :)</p>
							<li>Is it really free?</li>
							<p>Yes. BugRex is operated by developers who truly enjoy helping other people out.</p>
							<li>Is it only over chat?</li>
							<p>It's up to you and the expert. If you want to talk over voice or video, the expert might send you a link, so you can talk there. But all communication starts with the chat.</p>
							<li>Can I become an expert?</li>
							<p>If you're interested in working an expert, hit the 'Become an Expert' button in the top left corner of the site.</p>
							<li>Who are you?</li>
							<p>We are a startup from Norway who believe it should be an easier to find help when you're stuck with a coding issue. Sometimes it's just better to talk to a real person, than to try consuming all the information that Google gives you. If you have questions you can contact us at <a className="link" href="mailto:support@bugrex.com">support@bugrex.com</a>. Read more about the <a className="link" href="https://medium.com/learning-new-stuff/creating-a-two-sided-marketplace-in-two-days-4482dfc1ead8">BugRex story here.</a></p>
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
