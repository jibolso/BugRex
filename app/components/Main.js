import React from "react";
import Olark from './Olark';
import Request from 'superagent';
import ReactModal from 'react-modal';
import ModalBody from './Modal/ModalBody';
import Navbar from './Navbar';
import Footer from './Footer';

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
		this.handleUserChange = this.handleUserChange.bind(this);
		this.handleUserSave = this.handleUserSave.bind(this);
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
			    skills: ['Chatting', 'Talking', 'Replying']
			},
			modalOpen: false
		};
	}

	componentDidMount(){
		document.addEventListener("newMessageFromOperator", this.update, false);
		Request.get('/api/user')
			.then(res => {
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
		if (operator !== this.state.user.operator && operator !== 'Andy' && operator !== 'INTERNAL_NOTIFICATION') {
			Request.get('/api/user/' + operator)
			.then(res => {
				this.setState({
					operator: res.body
				});
			});
		}

	}

	handleUserChange(field, newValue) {
		let newUser = Object.assign({}, this.state.user, {
			[field]: newValue
		});
		this.setState({
			user: newUser
		});	
	}

	handleUserSave() {
		Request
			.put('/api/user')
			.send(this.state.user)
			.end(res => {
				// saved
			});	
	}

	render(){
        let children = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, Object.assign(this.state, {
            	onUserChange: this.handleUserChange,
            	onUserSave: this.handleUserSave
            }));
        });

		let showOlark = false;
		if (this.props.location.pathname === '/') {
			showOlark = true;
		}
		return (
			<div className="container-site">
				<Navbar {...this.state} />			
				{children}
				<ReactModal
        			isOpen={this.state.modalOpen}
					openModal={this.openModal}
					onRequestClose={this.closeModal} 
					style={customStyles}>
					<ModalBody {...this.state.operator} />
				</ReactModal>
				<Olark
					onClick={this.openModal}
					{...this.state} 
					showOlark={showOlark}/>
			</div>
		);
	}
}
