import React from 'react';
import Request from 'superagent';
import ReactModal from 'react-modal';
import ModalBody from '../Modal/ModalBody';

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

export default class Featured extends React.Component {
	
	constructor(){
		super();
		this.state = {
			users: [],
			modalData: {},
			modalOpen: false
		}
		this.closeModal = this.closeModal.bind(this);
	}

	closeModal(){
		this.setState({
			modalOpen: false
		});
	}

	openModal(user){
		this.setState({
			modalOpen: true,
			modalData: user
		});
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
			<ReactModal
    			isOpen={this.state.modalOpen}
				openModal={this.openModal}
				onRequestClose={this.closeModal} 
				style={customStyles} >
				<ModalBody {...this.state.modalData} />
			</ReactModal>
			{this.state.users.map((user, index) => {
				return (
					<div
						onClick={this.openModal.bind(this, user)}
						key={index} 
						className="featured-user">
						<h3 className="featured-title">{user.username}</h3>
						<img 
							src={user.profileImg} 
							className="img-small featured-img"/>
						<p className="featured-chats" >{user.completedChats} chats</p>
						<p className="featured-description">
						{
							user.description ? 
								user.description.length > 50 ? 
									user.description.substr(0, 50) + '...'
									: user.description
								: ''

						}</p>
					</div>
				);
			})}
			</div>
		);
	}
}