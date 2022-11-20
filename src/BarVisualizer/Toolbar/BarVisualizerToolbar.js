import React from 'react';
import './BarVisualizerToolbar.css';
import Slider from './Slider/SliderComponent';


function BarVisualizerToolbar(props) {

  return (
    <div class='toolbar-container'>
      <div class="buttons-container">
        <button onClick={() => props.generateNewArray(props.numOfElements)}>Randomize Array</button>
        <button onClick={props.bubbleSort}>Bubble Sort</button>
        <button>Selection Sort</button>
        <button>Merge Sort</button>
      </div>


      <div class="slider-container">
        <div id="elements-slider">
          <div class="label">
            <p>Change Array Size</p>
          </div>
          <Slider 
            usage="elements"
            min={props.minElements}
            max={props.maxElements}
            default={props.defaultElements}
            currentValue={props.numOfElements} 
            onSliderChange={props.onElementsSliderChange} 
          />
          <div class="value-display">
            <p>{props.numOfElements}</p>
          </div>
        </div>
        <div id="speed-slider">
          <div class="label">
            <p>Change Animation Speed</p>
          </div>
          <Slider 
            usage="speed"
            min={props.minDelay}
            max={props.maxDelay}
            default={props.defaultDelay}
            currentValue={props.currentDelay} 
            onSliderChange={props.onDelaySliderChange}
          />
          <div class="value-display">
            <p>{`${Math.round((props.currentDelay - props.minDelay)/(props.maxDelay - props.minDelay) * 100)}%`}</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default BarVisualizerToolbar;