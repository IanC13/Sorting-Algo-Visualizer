import React from 'react';
// react slider package
import ReactSlider from 'react-slider';
import './SliderComponent.css';

function Slider(props) {

  function handleSliderBarChange (value) {
    props.onSliderChange(value);
  }

  return (
    <div>
      <ReactSlider
        className="slider"
        trackClassName="track"
        thumbClassName="thumb"
        min={props.min}
        max={props.max}
        defaultValue={props.default}
        value={props.currentValue}
        onChange={handleSliderBarChange}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      />
    </div>
  )
}

export default Slider;