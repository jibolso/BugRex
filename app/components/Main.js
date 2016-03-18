import React from "react";
//import { expertData, getExpert } from '../utils/olark';
import Olark from './Olark';
import Request from 'superagent';
import ReactModal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

let user = {
	profileImg: 'static/images/dino.png',
	name: 'Mr. Rex',
	uniqueId: "github_2429547",
    completedChats: 16,
    githubUrl: "",
    username: "MrRex",
    description: "I'm just a stupid bot that helps you connect with an expert",
   	email: null,
    name: "Per Harald Borgen",
    skills: ['JavaScript', 'React', 'CSS', 'HTML', 'Node', 'Hapi', 'Heroku']
};

export default class Main extends React.Component {
	constructor(){
		super();
		this.update = this.update.bind(this);
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
		this.state = {
			operator: {
				profileImg: 'static/images/dino.png',
				name: 'Per Harald Borgen',
				uniqueId: "github_2429547",
			    completedChats: 16,
			    githubUrl: "https://api.github.com/users/perborgen",
			    username: "MrRex",
    			description: "I'm just a stupid bot that helps you connect with an expert",
			   	email: null,
			    name: "Per Harald Borgen",
			    skills: ['Chatting']
			},
			modalOpen: false
		};
	}

	componentDidMount(){
		console.log('componentDidMount');
		document.addEventListener("newMessageFromOperator", this.update, false);
		Request.get('/api/user')
			.then(res => {
				console.log('user res: ', res);
				this.setState({
					user: res.body,
					isAuthenticated: true
				});
			});
	}

	openModal(){
		this.setState({
			modalOpen: true
		});
	}

	closeModal(){
		this.setState({
			modalOpen: false
		});
	}

	update(){
		let operator = getExpert();
		console.log('operator: ', operator);
		if (operator !== this.state.user.operator && operator !== 'Andy') {
			Request.get('/api/user/' + operator)
			.then(res => {
				this.setState({
					operator: res.body
				});
			});
		}

	}

	handleDescriptionChange(ev) {
		if (ev &&  ev.preventDefault) {
			ev.preventDefault();
		}
		const newDescription = ev.target.value;
		this.setState({
			description: newDescription
		});
		Request.put('/api/user')
			.send({
				description: newDescription
			})
			.then(res => {
				// something
			});		
	}


	render(){
        let children = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, Object.assign(this.state, {
            	handleDescriptionChange: this.handleDescriptionChange
            }));
        });

		let olark;
		if (this.props.location.pathname === '/') {
			olark = <Olark onClick={this.openModal} {...this.state} />;

		}
		console.log('this.state: ', this.state);
		return (
			<div className="container-site">
				{children}
				<ReactModal
        			isOpen={this.state.modalOpen}
					openModal={this.openModal}
					onRequestClose={this.closeModal} 
					style={customStyles}>
					
					<img 
						className="modal-img"
						src={this.state.operator.profileImg} />
					<span className="modal-operatorname">
						{this.state.operator.operatorname}
					</span>
					<br/>
					<p>{this.state.operator.description}</p>
					<span className="modal-completed-chats">
						Completed chats: {this.state.operator.completedChats}
					</span>

					<ul className="modal-skills">
					{
						this.state.operator.skills.map((skill, index) => {
							return(
								<li 
									className="modal-skill"
									key={index}>
									{skill}
								</li>
							);
						})
					}
					</ul>
				</ReactModal>
				{olark}
			</div>
		);
	}
}
