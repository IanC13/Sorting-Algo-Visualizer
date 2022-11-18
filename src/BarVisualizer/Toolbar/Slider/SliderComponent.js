import React, { useState } from 'react';
// react slider package
import ReactSlider from 'react-slider';
import './SliderComponent.css';
import BarVisualizerBody from '../../Body/BarVisualizerBody';

function Slider() {
  // States
  // The array to be sorted
  const [numOfElements, setNumOfElements] = useState(10);


  return (
    <div>
      <ReactSlider
        className="slider"
        trackClassName="track"
        thumbClassName="thumb"
        min={10}
        max={100}
        defaultValue={10}
        value={numOfElements}
        onChange={(numOfElements) => {
          setNumOfElements(numOfElements);
        }}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      />

    <BarVisualizerBody num={numOfElements} />

    </div>
  )
}

export default Slider;