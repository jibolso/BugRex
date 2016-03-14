import React from 'react';
import Request from 'superagent';

export default class Featured extends React.Component {
	
	constructor(){
		super();
		this.state = {
			users: []
		}
	}
	
	componentDidMount(){
		Request.get('/api/users/featured')
			.end((err, res) => {
				this.setState({
					users: res.body
				});
			});
	}
	
	render() {
		return (
			<div>
			{this.state.users.map((user, index) => {
				return(
					<div key={index} className="featured-user">
						<h3>{user.username}</h3>
						<p>{user.description}</p>
						<span>Chats : {user.completedChats}</span>
						<img 
							src={user.profileImg} 
							className="img-small"/>
					</div>
				);
			})}
			</div>
		);
	}
}