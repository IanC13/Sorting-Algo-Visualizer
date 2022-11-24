import React from 'react';
import './BarVisualizerToolbar.css';
import Slider from './Slider/SliderComponent';


function BarVisualizerToolbar(props) {

  return (
    <div class='toolbar-container'>
      <div class="buttons-container">
        <button 
          onClick={() => 
            props.generateNewArray(props.numOfElements)}> 
          Randomize Array
        </button>

        <button onClick={props.bubbleSort}>
          Bubble Sort
        </button>

        <button onClick={props.selectionSort}>
          Selection Sort
        </button>

        <button 
          id='merge-sort-button' 
          onClick={props.mergeSort}
        >
          Merge Sort
        </button>
      </div>


      <div class="slider-container">
        <div id="elements-slider">
          <div class="label">
            <p className='toolbar-text'>Change Array Size</p>
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
            <p className='toolbar-text'>{props.numOfElements}</p>
          </div>
        </div>
        <div id="speed-slider">
          <div class="label">
            <p className='toolbar-text'>Change Animation Speed</p>
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
            <p className='toolbar-text'>
              {`${Math.round((props.currentDelay - props.minDelay) /
                  (props.maxDelay - props.minDelay) * 100)}%`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BarVisualizerToolbar;