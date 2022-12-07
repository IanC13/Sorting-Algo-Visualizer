import React, {useState, useEffect} from 'react';
import '../Styling/VisualizerContainer.css';

import CellVisualizerToolbar from './Toolbar/CellVisualizerToolbar';
import CellVisualizerBody from './Body/CellVisualizerBody';

import { bubbleSortHelperCell } from '../Algorithms/BubbleSort';
import { selectionSortHelperCell } from '../Algorithms/SelectionSort';

// Obj necessary as Framer Motion tracks the key for animation
const startingArray = [
    {key: 5, value: 5}, 
    {key: 2, value: 2}, 
    {key: 7, value: 7}, 
    {key: 4, value: 4}, 
    {key: 1, value: 1}, 
    {key: 6, value: 6}, 
    {key: 3, value: 3}, 
    {key: 0, value: 1} ];

// Tracks the current step in the algorithm when stepping through it
let currentStep = -1;

function CellVisualizer() {

  const [algoSelected, setAlgoSelected] = useState(false);

  const [sorted, setSorted] = useState(false);

  const [array, setArray] = useState(startingArray);

  const [arrayStates, setArrayStates] = useState();
  
  const [highlightedCells, setHighlightedCells] = useState();

  const [highlightedCellsStates, setHighlightedCellsStates] = useState();

  const [sortedElements, setSortedElements] = useState();

  const [sortedElementsStates, setSortedElementsStates] = useState();

  function resetState() {
    currentStep = -1;
    setAlgoSelected(true);
    setSorted(false);

    setArrayStates();

    setHighlightedCells();
    setHighlightedCellsStates();

    setSortedElements();
    setSortedElementsStates();
  }

  function bubbleSortFunction() {
    resetState();

    let {allArrayStates, animations, sortedElements} = 
        bubbleSortHelperCell(array);

    setArray(allArrayStates[0]);
    setArrayStates(allArrayStates);
    setHighlightedCellsStates(animations);
    setSortedElementsStates(sortedElements);
  }


  function selectionSortFunction() {
    resetState();

    let {allArrayStates, animations, sortedElements} = 
        selectionSortHelperCell(array);

    setArray(allArrayStates[0]);
    setArrayStates(allArrayStates);
    setHighlightedCellsStates(animations);
    setSortedElementsStates(sortedElements);

  }


  //===================== Control Button Functions =============================
  function stepForwardFunction() {
    currentStep += 1;
    
    // End of animations
    if (currentStep === arrayStates.length) {
      currentStep -= 1;
      setSorted(true);
    }

    if (currentStep === arrayStates.length -1) {
      setSorted(true);
    }
    
    setArray(arrayStates[currentStep]);
    setHighlightedCells(highlightedCellsStates[currentStep]);
    setSortedElements(sortedElementsStates[currentStep]);
  }

  function stepBackwardsFunction() {
    currentStep -= 1;
    
    if (currentStep < arrayStates.length -1) {
      setSorted(false);
    }
    
    if (currentStep === -1) {
      currentStep += 1;
    }
    
    setArray(arrayStates[currentStep]);
    setHighlightedCells(highlightedCellsStates[currentStep]);
    setSortedElements(sortedElementsStates[currentStep]);
  }

  //============================================================================

  return (
    <div className='CellVisualizer'>
      <CellVisualizerToolbar 
        bubbleSort={bubbleSortFunction}
        selectionSort={selectionSortFunction}


        algoSelected={algoSelected}
        stepForwards={stepForwardFunction}
        stepBackwards={stepBackwardsFunction}
      />

      <CellVisualizerBody 
        array={array}
        highlightedCells={highlightedCells}
        sortedElements={sortedElements}
        sorted={sorted}
      />
    </div>
  )
}

export default CellVisualizer;