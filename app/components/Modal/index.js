import React from 'react'
import { Link } from 'react-router';
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

export default class Modal extends React.Component {  

  render() {
    return (
      <ReactModal 
        isOpen={this.props.modalOpen}
        returnTo="/"
        style={customStyles}>
        <p><Link to='/'>Back</Link></p>
        {this.props.children}
      </ReactModal>
    );
  }
}

