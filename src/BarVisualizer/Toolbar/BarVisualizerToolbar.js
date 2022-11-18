import React from 'react';
import './BarVisualizerToolbar.css';


function BarVisualizerToolbar(props) {

  return (
    <div class='toolbar-container'>
      <h3>BarVisualizerToolbar.js</h3>
      <div class="buttons">
        <button onClick={props.generateNewArray}>Randomize Array</button>
        <button onClick={props.bubbleSort}>Bubble Sort</button>
        <button>Insertion Sort</button>
        <button>Merge Sort</button>
      </div>
    </div>
  );
}

export default BarVisualizerToolbar;