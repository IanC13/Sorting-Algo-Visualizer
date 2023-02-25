import React from 'react';
import '../../Styling/VisualizerToolbar.css';
import Slider from './Slider/SliderComponent';


function BarVisualizerToolbar(props) {

  return (
    <div class='toolbar-container'>
      <div class="left-buttons-container">
        <div className="control-buttons">
          <button
            onClick={() =>
              props.generateNewArray(props.numOfElements)}
            disabled={props.running}>
            Generate New Array
          </button>

          <button 
            onClick={props.randomizeCurrentArray}
            disabled={props.running}
          >
            Randomize Current Array
          </button>
        </div>

        <div className="algo-buttons">
          <button onClick={props.bubbleSort} disabled={props.running}>
            Bubble Sort
          </button>

          <button onClick={props.selectionSort} disabled={props.running}>
            Selection Sort
          </button>

          <button
            id='merge-sort-button'
            onClick={props.mergeSort}
            disabled={props.running}
          >
            Merge Sort
          </button>

          <button onClick={props.insertionSort} disabled={props.running}>
            Insertion Sort
          </button>
        </div>
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
            disabled={props.running}
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
            disabled={props.running}
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