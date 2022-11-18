import React from 'react';
import './BarVisualizerToolbar.css';

import Slider from './Slider/SliderComponent';


function BarVisualizerToolbar(props) {

  return (
    <div class='toolbar-container'>
      <div class="buttons">
        <button onClick={props.generateNewArray}>Randomize Array</button>
        <button onClick={props.bubbleSort}>Bubble Sort</button>
        <button>Insertion Sort</button>
        <button>Merge Sort</button>
      </div>

      <div class="slider">
        <Slider />
      </div>
    </div>
  );
}

export default BarVisualizerToolbar;