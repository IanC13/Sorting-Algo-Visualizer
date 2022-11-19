import React from 'react';
// react slider package
import ReactSlider from 'react-slider';
import './SliderComponent.css';

function Slider(props) {

  function handleSliderBarChange (value) {
    props.onElementsSliderChange(value);
  }

  return (
    <div>
      <ReactSlider
        className="slider"
        trackClassName="track"
        thumbClassName="thumb"
        min={10}
        max={100}
        defaultValue={50}
        value={props.numOfElements}
        onChange={handleSliderBarChange}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      />
    </div>
  )
}

export default Slider;