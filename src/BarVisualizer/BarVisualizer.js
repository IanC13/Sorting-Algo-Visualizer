import React, {useState, useEffect} from 'react';
import '../Styling/VisualizerContainer.css';
import BarVisualizerBody from './Body/BarVisualizerBody';
import BarVisualizerToolbar from './Toolbar/BarVisualizerToolbar';

import bubbleSortHelperBar from '../Algorithms/BarView/BubbleSortBar';
import selectionSortHelperBar from '../Algorithms/BarView/SelectionSortBar';
import mergeSortHelperBar from '../Algorithms/BarView/MergeSortBar';
import insertionSortHelperBar from '../Algorithms/BarView/InsertionSortBar';

const MIN_DELAY = 1;
const MAX_DELAY = 100;

const MIN_NUMBER_OF_ELEMENTS = 10;
const MAX_NUMBER_OF_ELEMENTS = 100;

function BarVisualizer() {
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

  // Used in merge sort to grey out the bars that are not currently being merged
  const [greyOutBars, setGreyOutBars] = useState([]);

  const [running, setRunning] = useState(false);

  let defaultDelay = (MIN_DELAY + MAX_DELAY) / 2;
  const [animationDelay, setAnimationDelay] = useState(defaultDelay);

  // componentDidMount eqv only 
  useEffect(function () {
    newArray();
  }, [])

  useEffect(function () {
    newArray(numOfElements)
  }, [numOfElements])

  // Reset running state to be false when array sorted
  // re enables the buttons
  useEffect(function() {
    if (sorted === true) {
      setRunning(false);
    }
  }, [sorted])
  
  function newArray(numOfElements) {
    let tempArray = [];
    let tempIdxArray = [];

    // Generate 100 random numbers to put in array
    for (let i = 0; i < numOfElements; i++) {
        tempArray.push(randomInteger());
        tempIdxArray.push(i);
    }; 

    // Set array state
    setArray(tempArray);
    setCurrentBars([]);
    setSpecial([]);
    setSorted(false);
    setSortedBars([]);
    setGreyOutBars(tempIdxArray);
  }

  // Fisher-Yates Shuffle algorithm to randomize elements in the array
  function randomizeCurrentArray() {
    setCurrentBars([]);
    setSpecial([]);
    setSorted(false);
    setSortedBars([]);

    let newArray = array.slice();

    let currentIdx = newArray.length, randomIdx;

    // While there are elements to shuffle
    while (currentIdx !== 0) {
      // pick random index
      randomIdx = Math.floor(Math.random() * currentIdx);
      currentIdx -= 1;

      // swap with current element
      [newArray[currentIdx], newArray[randomIdx]] = 
          [newArray[randomIdx], newArray[currentIdx]];
    }

    setArray(newArray);
  }

  function calculateDelay() {
    return (-1 * animationDelay) + MIN_DELAY + MAX_DELAY;
  }

  function resetState() {
    setCurrentBars([]);
    setSpecial([]);
    setSorted(false);
    setSortedBars([]);
    setRunning(true);
  }

  function bubbleSortFunction() {
    resetState();

    bubbleSortHelperBar(
        array, 
        calculateDelay, 
        setCurrentBars, 
        setSpecial, 
        setArray, 
        setSorted, 
        setSortedBars
    );
  }

  function selectionSortFunction() {
    resetState();

    selectionSortHelperBar(
        array, 
        calculateDelay, 
        setCurrentBars, 
        setSpecial, 
        setArray, 
        setSorted, 
        setSortedBars
    );
  }

  function mergeSortFunction() {
    resetState();

    mergeSortHelperBar(
        array, 
        calculateDelay, 
        setCurrentBars, 
        setSpecial, 
        setArray, 
        setSorted, 
        setSortedBars, 
        setGreyOutBars);
  }

  function insertionSortFunction() {
    resetState();

    insertionSortHelperBar(
      array, 
      calculateDelay, 
      setCurrentBars, 
      setSpecial, 
      setArray, 
      setSorted, 
      setSortedBars
    );
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
        randomizeCurrentArray={randomizeCurrentArray}

        running={running}
        
        bubbleSort={bubbleSortFunction}
        selectionSort={selectionSortFunction}
        mergeSort={mergeSortFunction}
        insertionSort={insertionSortFunction}
      />

      <BarVisualizerBody 
        numOfElements={numOfElements} 
        array={array}
        currentBars={currentBars}
        specialBar={specialBar}
        sorted={sorted}
        sortedBars={sortedBars}
        greyOutBars={greyOutBars}
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