import React from 'react';
import Request from 'superagent';

export default class Experts extends React.Component {
	
	constructor(){
		super();
		this.state = {
			experts: []
		}
	}
	
	componentDidMount(){
		Request.get('/api/experts/featured')
			.end((err, res) => {
				this.setState({
					experts: res.body
				});
			});
	}
	
	render() {
		return (
			<div>
			{this.state.experts.map((expert, index) => {
				return(
					<div key={index}>
						<h3>{expert.name}</h3>
						<p>{expert.description}</p>
					</div>
				);
			})}
			</div>
		);
	}
}