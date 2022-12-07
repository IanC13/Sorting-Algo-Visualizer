import React from 'react';
import '../../Styling/VisualizerToolbar.css';


function CellVisualizerToolbar(props) {

  return (
    <div class='toolbar-container'>
      <div class="left-buttons-container">
        <div className="algo-buttons">
          <button 
            onClick={props.bubbleSort} 
            disabled={props.running}
          >
            Bubble Sort
          </button>

          <button 
            onClick={props.selectionSort} 
            disabled={props.running}
          >
            Selection Sort
          </button>

          <button
            id='merge-sort-button'
            onClick={props.mergeSort}
            disabled={props.running}
          >
            Merge Sort
          </button>
        </div>
      </div>

      <div className='right-buttons-container'>
        <button 
          onClick={props.stepBackwards}
          disabled={!props.algoSelected}
        >
          {`<`}
        </button>

        <button 
          onClick={props.stepForwards}
          disabled={!props.algoSelected}
        >
          {`>`}
        </button>

      </div>
    </div>
  );
}

export default CellVisualizerToolbar;