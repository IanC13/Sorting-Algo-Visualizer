import React from 'react';
import '../../Styling/VisualizerToolbar.css';

const DEFAULT_COLOR = '#A51C30';
const SELECTED_COLOR = '#535353';

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
            style={{
              backgroundColor: props.selectedAlgorithm === 'BUBBLE' ? 
                  SELECTED_COLOR : DEFAULT_COLOR
            }}
          >
            Bubble Sort
          </button>

          <button 
            onClick={props.selectionSort} 
            disabled={props.running}
            style={{
              backgroundColor: props.selectedAlgorithm === 'SELECTION' ? 
                  SELECTED_COLOR : DEFAULT_COLOR
            }}
          >
            Selection Sort
          </button>

          <button
            id='merge-sort-button'
            onClick={props.mergeSort}
            disabled={props.running}
            style={{
              backgroundColor: props.selectedAlgorithm === 'MERGE' ? 
                  SELECTED_COLOR : DEFAULT_COLOR
            }}
          >
            Merge Sort
          </button>

          <button 
            onClick={props.insertionSort} 
            disabled={props.running}
            style={{
              backgroundColor: props.selectedAlgorithm === 'INSERTION' ? 
                  SELECTED_COLOR : DEFAULT_COLOR
            }}
          >
            Insertion Sort
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