import React from 'react';
import '../../Styling/VisualizerToolbar.css';


function CellVisualizerToolbar(props) {

  return (
    <div class='toolbar-container'>
      <div class="left-buttons-container">
      <div className="control-buttons">
          <button
            onClick={props.resetArray}
            disabled={props.running}>
            Reset To Default Array
          </button>
        </div>
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

      <div className='right-buttons-container playback-control-buttons'>
        <div className='auto-playback-buttons-container'>
          <div className=''>
            <p className='toolbar-text'>Autoplay</p>
          </div>
            
          <div className='auto-playback-buttons'>
            <button
              onClick={props.pause}
              disabled={!props.algoSelected || !props.running}
            >
              Pause
            </button>
            <button
              onClick={props.play}
              disabled={!props.algoSelected || props.running || 
                  props.endOfAnimations}
            >
              Play
            </button>
          </div>
        </div>

        <div className='manual-playback-buttons-container'>
          <div className=''>
            <p className='toolbar-text'>Manual Step Through</p>
          </div>

          <div className='manual-playback-buttons'>
            <button
              onClick={props.stepBackwards}
              disabled={!props.algoSelected || props.running || 
                  props.startOfAnimations}
            >
              {`<`}
            </button>

            <button
              onClick={props.stepForwards}
              disabled={!props.algoSelected || props.running || 
                  props.endOfAnimations}
            >
              {`>`}
            </button>
            
          </div>
        </div>

      </div>
    </div>
  );
}

export default CellVisualizerToolbar;