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
			<div className="featured-container">
			{this.state.users.map((user, index) => {
				return(
					<div key={index} className="featured-user">
						<h3 className="featured-title">{user.username}</h3>
						<img 
							src={user.profileImg} 
							className="img-small featured-img"/>
						<p className="featured-chats" >Chats : {user.completedChats}</p>
						<p className="featured-description">{user.description}</p>
					</div>
				);
			})}
			</div>
		);
	}
}