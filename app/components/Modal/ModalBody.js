import React from 'react'
import { Link } from 'react-router';
import ReactModal from 'react-modal';


export default class ModalBody extends React.Component {  
  render() {
    return (
      <div>
        <img 
            className="modal-img"
            src={this.props.profileImg} />
            <span className="modal-operatorname">
              {this.props.username}
            </span>
            <br/>
            <p>{this.props.description}</p>
            <span className="modal-completed-chats">
              Completed chats: {this.props.completedChats}
            </span>

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
        </div>
    );
  }
}

