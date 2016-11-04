import React from 'react';
import * as Records from '../../records/records';
import * as Constants from '../../utils/constants';
import { connect } from 'react-redux';
import { Modal, Popover, Tooltip, OverlayTrigger, Button, closeButton } from 'react-bootstrap';
import { render } from 'react-dom';
import IBC from './IBC';
var Modal = require('react-modal');

require('react-bootstrap');


const openClose = dispatch => dispatch({ type: Constants.SLIDING_SCALE_TOGGLE_VISIBILITY });

const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: '100px', bottom: '0px', left: '100px', right: '0px',
  width: '50%',
  height: '50%'
};

const backdropStyle = {
  position: 'fixed',
  top: '100px', bottom: '0px', left: '100px', right: '0px',
  zIndex: 'auto',
  backgroundColor: '#F2F2F2',
  opacity: 1.5,
  width: '50%',
  height: '50%'
};

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


const IBCModal = ({slidingScale, dispatch}) => {
  const toggle = openClose.bind(null, dispatch);
  return (
    <Modal
      isOpen={this.state.modalIsOpen}
      onAfterOpen={this.afterOpenModal}
      onRequestClose={this.closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      >

      <h2 ref="subtitle">Hello</h2>
      <button onClick={this.closeModal}>close</button>
      <div>I am a modal</div>
      <form>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form>
    </Modal>
  );
}


export default connect(state => ({
  dispatch: state.dispatch,
  slidingScale: state.slidingScale
}))(IBCModal);

