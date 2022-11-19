import React from 'react';
import './BarVisualizerToolbar.css';
import Slider from './Slider/SliderComponent';


function BarVisualizerToolbar(props) {

  return (
    <div class='toolbar-container'>
      <div class="buttons-container">
        <button onClick={() => props.generateNewArray(props.numOfElements)}>Randomize Array</button>
        <button onClick={props.bubbleSort}>Bubble Sort</button>
        <button>Insertion Sort</button>
        <button>Merge Sort</button>
      </div>


      <div class="slider-container">
        <div id="elements-slider">
          <div class="label">
            <p>Change Array Size</p>
          </div>
          <div class="placeholder"></div>
          <Slider numOfElements={props.numOfElements} onElementsSliderChange={props.onElementsSliderChange} />
        </div>
        <div id="speed-slider">
          <div class="label">
            <p>Change Animation Speed</p>
          </div>
          <div class="placeholder"></div>
          <Slider />
        </div>
      </div>

    </div>
  );
}

export default BarVisualizerToolbar;