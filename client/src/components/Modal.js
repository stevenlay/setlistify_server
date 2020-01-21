import React from "react";
import ReactDOM from "react-dom";

const Modal = props => {
  return ReactDOM.createPortal(
    <div className='ui dimmer modals visible active'>
      <div className='ui standard modal visible active'>
        <div className='header'>Import Setlist</div>
        <div className='content'>
          Would you like to add this setlist to your Spotity account?
        </div>
        <div className='actions'>
          <button className='ui primary button'>Yes</button>
          <button className='ui button'>Cancel</button>
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
