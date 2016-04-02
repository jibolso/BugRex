import React from 'react'
import { Link } from 'react-router';
import ReactModal from 'react-modal';


export default class ModalBody extends React.Component {  
  render() {
    return (
      <div>
        <div className="modal-head">
          <div className="modal-head-left">
          <img 
              className="modal-img"
              src={this.props.profileImg} />
        </div>
        <div className="modal-head-right">
          <span className="modal-operatorname">
            {this.props.username}
          </span>
          <br/>
          <span className="modal-completed-chats">
            {this.props.completedChats} chats
          </span>
        </div>
        </div>
            <p>{this.props.description}</p>
            {/*
            <ul className="modal-skills">
            {
              this.props.skills.map((skill, index) => {
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
            */}
        </div>
    );
  }
}

