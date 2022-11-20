import React, {useState, useEffect} from 'react';
import BarVisualizerBody from './Body/BarVisualizerBody';
import BarVisualizerToolbar from './Toolbar/BarVisualizerToolbar';
import './BarVisualizer.css';

import bubbleSortHelper from '../Algorithms/BubbleSort';
import selectionSortHelper from '../Algorithms/SelectionSort';

const MIN_DELAY = 1;
const MAX_DELAY = 500;

const MIN_NUMBER_OF_ELEMENTS = 10;
const MAX_NUMBER_OF_ELEMENTS = 100;

function BarVisualizer() {
  // Lifting the state up
  // Number of elements in the array 
  let defaultElements = (MIN_NUMBER_OF_ELEMENTS + MAX_NUMBER_OF_ELEMENTS) / 2;
  const [numOfElements, setNumOfElements] = useState(defaultElements);
  
  // States
  // The array to be sorted
  const [array, setArray] = useState([]);
  
  // Keeps track of the 2 bars we are currently comparing
  const [currentBars, setCurrentBars] = useState([]);

  // Larger of the comparisons
  const [specialBar, setSpecial] = useState();

  const [sorted, setSorted] = useState(false);

  const [sortedBars, setSortedBars] = useState([]);

  let defaultDelay = (MIN_DELAY + MAX_DELAY) / 2;
  const [animationDelay, setAnimationDelay] = useState(defaultDelay);

  // componentDidMount eqv only 
  useEffect(function () {
    newArray();
  }, [])

  useEffect(function () {
    newArray(numOfElements)
  }, [numOfElements])


  function newArray(numOfElements) {
    let tempArray = [];

    // Generate 100 random numbers to put in array
    for (let i = 0; i < numOfElements; i++) {
        tempArray.push(randomInteger());
    }; 

    // Set array state
    setArray(tempArray);
    setCurrentBars([]);
    setSpecial([]);
    setSorted(false);
    setSortedBars([]);
  }

  function calculateDelay() {
    return (-1 * animationDelay) + MIN_DELAY + MAX_DELAY;
  }

  function bubbleSortFunction() {
    bubbleSortHelper(array, calculateDelay, setCurrentBars, setSpecial, setArray, setSorted, setSortedBars);
  }

  function selectionSortFunction() {
    selectionSortHelper(array, calculateDelay, setCurrentBars, setSpecial, setArray, setSorted, setSortedBars);
  }

  function handleElementsSliderChange(value) {
    setNumOfElements(value);
  }

  function handleDelaySliderChange(value) {
    setAnimationDelay(value);
  }

  return (
    <div className="BarVisualizer">
      <BarVisualizerToolbar
        numOfElements={numOfElements} 
        onElementsSliderChange={handleElementsSliderChange}

        minDelay={MIN_DELAY}
        maxDelay={MAX_DELAY}
        defaultDelay={defaultDelay}
        currentDelay={animationDelay}
        onDelaySliderChange={handleDelaySliderChange}

        minElements={MIN_NUMBER_OF_ELEMENTS}
        maxElements={MAX_NUMBER_OF_ELEMENTS}
        defaultElements={defaultElements}
        generateNewArray={newArray} 
        
        bubbleSort={bubbleSortFunction}
        selectionSort={selectionSortFunction}
      />

      <BarVisualizerBody 
        numOfElements={numOfElements} 
        array={array}
        currentBars={currentBars}
        specialBar={specialBar}
        sorted={sorted}
        sortedBars={sortedBars}
      />
    </div>
  );
}

// Random integer from 1 to 1000
function randomInteger() {
  // (0 to 999) +1
  return Math.floor(Math.random() * 1000) + 1;
}

export default BarVisualizer;
