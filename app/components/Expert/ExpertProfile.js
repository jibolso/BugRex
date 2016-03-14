import React from 'react';
import Request from 'superagent';

export default class ExpertProfile extends React.Component {

	constructor(){
		super();
		this.componentDidMount = this.componentDidMount.bind(this);
		this.state = {
			expert: {}
		}
	}
	componentDidMount(){
		Request.get('/api/expert/' + this.props.params.expertName)
		.then(res => {
			console.log('repsonse: ', res);
			this.setState({
				expert: res.body[0]
			});
		});
	}

	render() {
		return (
			<div>
				<p>{this.state.expert.username}</p>
				<p>Completed chats: {this.state.expert.completedChats}</p>
				<p>{this.state.expert.username}</p>
				<img 
					src="https://avatars.githubusercontent.com/u/2429547?v=3"
					style={{width:'200px', height: '200px'}}/>
			</div>
		);
	}
}