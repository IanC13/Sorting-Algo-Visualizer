// Adapted from https://www.w3schools.com/howto/howto_css_switch.asp

import React from 'react';
import './ToggleButton.css';

function ToggleButton(props) {

  return (
    <div className='toggle-button'>
      <label className='switch'>
        <input 
          type="checkbox" 
          onClick={props.onViewStateChange}>
        </input>
        <span className='toggle-button-thumb round'></span>
      </label>
    </div>
  )
}

export default ToggleButton;