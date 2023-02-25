import React, {useState} from 'react';
import '../Styling/VisualizerContainer.css';

import CellVisualizerToolbar from './Toolbar/CellVisualizerToolbar';
import CellVisualizerBody from './Body/CellVisualizerBody';

import bubbleSortHelperCell from '../Algorithms/Cell/BubbleSortCell';
import selectionSortHelperCell from '../Algorithms/Cell/SelectionSortCell';
import mergeSortHelperCell from '../Algorithms/Cell/MergeSortCell';
import insertionSortHelperCell from '../Algorithms/Cell/InsertionSortCell';

// Obj necessary as Framer Motion tracks the key for animation
const startingArray = [
    {key: 0, value: 15}, 
    {key: 1, value: 13}, 
    {key: 2, value: 7}, 
    {key: 3, value: 19}, 
    {key: 4, value: 9}, 
    {key: 5, value: 15}, 
    {key: 6, value: 2},
    {key: 7, value: 6},
  ];

// Tracks the current step in the algorithm when stepping through it
let currentStep = -1;

// setInterval timer ID for auto play
let playTimer;

function CellVisualizer() {

  const [algoSelected, setAlgoSelected] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState();

  const [sorted, setSorted] = useState(false);
  const [auxSorted, setAuxSorted] = useState(false);

  const [array, setArray] = useState(startingArray);
  const [arrayStates, setArrayStates] = useState();
  
  const [highlightedCells, setHighlightedCells] = useState();
  const [highlightedCellsStates, setHighlightedCellsStates] = useState();

  const [sortedElements, setSortedElements] = useState();
  const [sortedElementsStates, setSortedElementsStates] = useState();

  const [running, setRunning] = useState(false);

  const [startOfAnimations, setStartOfAnimations] = useState(false);
  const [endOfAnimations, setEndOfAnimations] = useState(false);

  const [auxillaryArrays, setAuxillaryArrays] = useState([]);
  const [auxillaryArrayStates, setAuxillaryArrayStates] = useState();

  const [greyOutCells, setGreyOutCells] = useState([]);
  const [greyOutCellStates, setGreyOutCellStates] = useState();

  const [auxGreyOutCells, setAuxGreyOutCells] = useState([]);
  const [auxGreyOutCellStates, setAuxGreyOutCellStates] = useState();

  const [auxHighlightedCells, setAuxHighlightedCells] = useState();
  const [auxHighlightedCellStates, setAuxHighlightedCellStates] = useState();

  const [auxSortedElements, setAuxSortedElements] = useState();
  const [auxSortedElementStates, setAuxSortedElementStates] = useState();


  function resetDefaultArray() {
    currentStep = -1;
    setAlgoSelected(false);
    setSelectedAlgorithm();
    setSorted(false);
    setAuxSorted(false);

    setArray(startingArray)
    setArrayStates();

    setHighlightedCells();
    setHighlightedCellsStates();

    setSortedElements();
    setSortedElementsStates();

    setRunning(false);
    setEndOfAnimations(false);

    setAuxillaryArrays([]);
    setAuxillaryArrayStates();
    setGreyOutCells([]);
    setGreyOutCellStates();
    setAuxGreyOutCells([]);
    setAuxGreyOutCellStates();
    setAuxHighlightedCells();
    setAuxHighlightedCellStates();
    setAuxSortedElements();
    setAuxSortedElementStates();
  }

  function resetState() {
    currentStep = -1;
    setAlgoSelected(true);
    setSelectedAlgorithm();
    setSorted(false);
    setAuxSorted(false);

    setArrayStates();

    setHighlightedCells();
    setHighlightedCellsStates();

    setSortedElements();
    setSortedElementsStates();

    setRunning(false);
    setStartOfAnimations(true);
    setEndOfAnimations(false);

    setAuxillaryArrays([]);
    setAuxillaryArrayStates();
    setGreyOutCells([]);
    setGreyOutCellStates();
    setAuxGreyOutCells([]);
    setAuxGreyOutCellStates();
    setAuxHighlightedCells();
    setAuxHighlightedCellStates();
    setAuxSortedElements();
    setAuxSortedElementStates();
  }

  //==================== Sorting Algorithm Functions ===========================

  function bubbleSortFunction() {
    resetState();
    setSelectedAlgorithm('BUBBLE');

    let {allArrayStates, animations, sortedElements} = 
        bubbleSortHelperCell(array);

        
    setArray(allArrayStates[0]);
    setArrayStates(allArrayStates);
    setHighlightedCellsStates(animations);
    setSortedElementsStates(sortedElements);
        
    let length = allArrayStates.length;
    // Not used states
    let placeholder = [];
    for (let i = 0; i < length; i++) {
      placeholder.push([]);
    }
    setAuxillaryArrayStates(placeholder);
    setGreyOutCellStates(placeholder);
    setAuxGreyOutCellStates(placeholder);
    setAuxHighlightedCellStates(placeholder);
    setAuxSortedElements(placeholder);
    setAuxSortedElementStates(placeholder);
  }


  function selectionSortFunction() {
    resetState();
    setSelectedAlgorithm('SELECTION');

    let {allArrayStates, animations, sortedElements} = 
        selectionSortHelperCell(array);

    setArray(allArrayStates[0]);
    setArrayStates(allArrayStates);
    setHighlightedCellsStates(animations);
    setSortedElementsStates(sortedElements);

    let length = allArrayStates.length;
    let placeholder = [];
    for (let i = 0; i < length; i++) {
      placeholder.push([]);
    }
    // Not used states
    setAuxillaryArrayStates(placeholder);
    setGreyOutCellStates(placeholder);
    setAuxGreyOutCellStates(placeholder);
    setAuxHighlightedCellStates(placeholder);
    setAuxSortedElements(placeholder);
    setAuxSortedElementStates(placeholder);
  }

  function mergeSortFunction() {
    resetState();
    setSelectedAlgorithm('MERGE');

    let { allArrayStates, 
          auxSortedElements, 
          auxillaryArrays, 
          auxAnimations, 
          greyOutCells, 
          auxGreyOutCells } = mergeSortHelperCell(array);
    
    setArrayStates(allArrayStates);
    setAuxillaryArrayStates(auxillaryArrays);
    setAuxHighlightedCellStates(auxAnimations);
    setGreyOutCellStates(greyOutCells);
    setAuxGreyOutCellStates(auxGreyOutCells);   
    setAuxSortedElementStates(auxSortedElements);
  
    let length = allArrayStates.length;
    // Not used states
    let placeholder = [];
    for (let i = 0; i < length; i++) {
      placeholder.push([]);
    }

    setHighlightedCellsStates(placeholder);
    setSortedElementsStates(placeholder);
  }

  function insertionSortFunction() {
    resetState();
    setSelectedAlgorithm('INSERTION');

    let {allArrayStates, animations, sortedElements} = 
        insertionSortHelperCell(array);

    setArray(allArrayStates[0]);
    setArrayStates(allArrayStates);
    setHighlightedCellsStates(animations);
    setSortedElementsStates(sortedElements);
        
    let length = allArrayStates.length;
    // Not used states
    let placeholder = [];
    for (let i = 0; i < length; i++) {
      placeholder.push([]);
    }
    setAuxillaryArrayStates(placeholder);
    setGreyOutCellStates(placeholder);
    setAuxGreyOutCellStates(placeholder);
    setAuxHighlightedCellStates(placeholder);
    setAuxSortedElements(placeholder);
    setAuxSortedElementStates(placeholder);
  }

  //===================== Control Button Functions =============================
  function stepForwardFunction() {
    currentStep += 1;
    
    // End of animations
    if (currentStep === arrayStates.length) {
      currentStep -= 1;
      setEndOfAnimations(true);
    }
    
    // Check if sorted
    if (currentStep === arrayStates.length -1) {
      // Highlight primary array
      if (selectedAlgorithm !== 'MERGE') {
        setSorted(true);
      }
      setAuxSorted(true);
    }

    // Not the start of animations
    if (currentStep > 0) {
      setStartOfAnimations(false);
    }
    
    editStates();
  }

  function stepBackwardsFunction() {
    currentStep -= 1;
    
    // Not the end of animations
    if (currentStep < arrayStates.length -1) {
      setEndOfAnimations(false);
      setSorted(false);
      setAuxSorted(false);
    }
    
    // If we stepped further back from the start of the animations
    if (currentStep === -1) {
      currentStep += 1;
    }

    // Very start of animations
    if (currentStep === 0) {
      setStartOfAnimations(true);
    }
        
    editStates();
  }

  function playAnimationFunction() {
    setRunning(true);
    setStartOfAnimations(false);

    playTimer = setInterval(() => {
      currentStep += 1;
    
      // End of animations
      if (currentStep === arrayStates.length) {
        currentStep -= 1;
        setRunning(false);
        setEndOfAnimations(true);
        clearInterval(playTimer);
        if (selectedAlgorithm !== 'MERGE') {
          setSorted(true);
        }
        setAuxSorted(true);
      }

      if (currentStep === arrayStates.length -1) {
        if (selectedAlgorithm !== 'MERGE') {
          setSorted(true);
        }
        setAuxSorted(true);
      }
      editStates();
    }, 250)

  }

  function pauseAnimationFunction() {
    setRunning(false);
    clearInterval(playTimer);
  }

  function editStates() {
    setArray(arrayStates[currentStep]);
    setHighlightedCells(highlightedCellsStates[currentStep]);
    setSortedElements(sortedElementsStates[currentStep]);

    setGreyOutCells(greyOutCellStates[currentStep]);
    setAuxGreyOutCells(auxGreyOutCellStates[currentStep]);
    setAuxillaryArrays(auxillaryArrayStates[currentStep]);
    setAuxHighlightedCells(auxHighlightedCellStates[currentStep]);
    setAuxSortedElements(auxSortedElementStates[currentStep]);
  }

  //============================================================================

  return (
    <div className='CellVisualizer'>
      <CellVisualizerToolbar 
        resetArray={resetDefaultArray}
        running={running}
        startOfAnimations={startOfAnimations}
        endOfAnimations={endOfAnimations}

        bubbleSort={bubbleSortFunction}
        selectionSort={selectionSortFunction}
        mergeSort={mergeSortFunction}
        insertionSort={insertionSortFunction}

        algoSelected={algoSelected}
        selectedAlgorithm={selectedAlgorithm}

        play={playAnimationFunction}
        pause={pauseAnimationFunction}
        stepForwards={stepForwardFunction}
        stepBackwards={stepBackwardsFunction}
      />

      <CellVisualizerBody 
        array={array}
        highlightedCells={highlightedCells}
        sortedElements={sortedElements}
        sorted={sorted}
        greyOutCells={greyOutCells}
        auxGreyOutCells={auxGreyOutCells}
        auxillaryArrays={auxillaryArrays}
        auxHighlightedCells={auxHighlightedCells}
        auxSortedElements={auxSortedElements}
        auxSorted={auxSorted}
      />
    </div>
  )
}

export default CellVisualizer;