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
	profileImg: 'https://avatars.githubusercontent.com/u/2429547?v=3',
	name: 'Per Harald Borgen',
	uniqueId: "github_2429547",
    completedChats: 16,
    githubUrl: "https://api.github.com/users/perborgen",
    username: "mrRex",
    description: "I'm a Norwegian JS developer. I like to code and play fotball. Working with React on a daily basis",
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
		this.state = {
			user: {
				skills: []
			},
			modalOpen: false
		};
	}

	componentDidMount(){
		//document.addEventListener("build", this.update,false);

		Request.get('/api/user')
			.then(res=> {
				console.log('........res: ', res);
				this.setState({
					user: res.body
				});
			});
	}

	openModal(){
		console.log('ioen modal')
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

	}


	render(){

        let children = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, this.state);
        });

		let olark;
		if (this.props.location.pathname === '/') {
			olark = <Olark onClick={this.openModal} {...this.state} />;

		}
		console.log('Main olark: ', olark);
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
						src={this.state.user.profileImg} />
					<span className="modal-username">
						{this.state.user.username}
					</span>
					<br/>
					<p>{this.state.user.description}</p>
					<span className="modal-completed-chats">
						Completed chats: {this.state.user.completedChats}
					</span>

					<ul className="modal-skills">
					{
						this.state.user.skills.map((skill, index) => {
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
