import React, {useState, useEffect} from 'react';
import BarVisualizerBody from './Body/BarVisualizerBody';
import BarVisualizerToolbar from './Toolbar/BarVisualizerToolbar';
import './BarVisualizer.css';

import bubbleSort from '../Algorithms/BubbleSort';

function BarVisualizer() {
  // Lifting the state up
  // Number of elements in the array 
  const [numOfElements, setNumOfElements] = useState(50);
  
  // States
  // The array to be sorted
  const [array, setArray] = useState([]);
  
  // Keeps track of the 2 bars we are currently comparing
  const [currentBars, setCurrentBars] = useState([]);

  // Larger of the comparisons
  const [largerBar, setLarger] = useState();

  const [sorted, setSorted] = useState(false);

  const [animationDelay, setAnimationDelay] = useState(250);

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
    setLarger([]);
    setSorted(false);
  }

  function calculateSpeed() {
    return (-1 * animationDelay) + 510;
  }

  function bubbleSortFunction() {
    let speed = calculateSpeed();

    let {allArrayStates, animations, largerArray} = bubbleSort(array);

    const length = animations.length;

    // Delay from 2 same color highlighted bar to larger one highlighted with a different color
    let largerColorDelay = speed;
    // Delay from 2 differently highlighted bar to swapping
    let swapDelay = largerColorDelay + speed;

    for (let i = 0; i < length; i++) {
      setTimeout(() => {
        // Current 2 bars we are comparing. state change so re renders which trigger 
        // the color change
        setCurrentBars(animations[i]);

        // highlight the 2 comparing bars for some time before coloring the larger one 
        setTimeout(() => {
          // larger of the two, re render with a different color
          setLarger(largerArray[i][0]);
        }, largerColorDelay);

        // wait then swap
        setTimeout(() => {
          // Triggers re render, display swapped position
          setArray(allArrayStates[i]);
          setLarger(largerArray[i][1]);
        }, swapDelay);

        // reset swapped bars to be same color
        setLarger();

        if (i === length - 1){
          setSorted(true);
        }

      }, i * (speed + (largerColorDelay + swapDelay)));
      /*
      i * DELAY because setTimeout is non-blocking i.e. entire for loop will 
      run during wait time. for loop runs pretty much instantly so everything
      in setTimeout only runs once as DELAY > for loop

      i * DELAY solves this by creating a timer every pass as using 'let', 
      a unique i is declared for each iteration and the timer 
      is old time + DELAY (as i is 1 bigger than i-1)

      USE WITH CAUTION. A new timer is created on every pass which means
      length number of timers are created, a lot more memory usage.
      */
    }
    setCurrentBars([]);
    setLarger([]);
  }

  function handleElementsSliderChange(value) {
    setNumOfElements(value);
  }

  function handleDelaySliderChange(value) {
    setAnimationDelay(value);
  }

  return (
    <div className="BarVisualizer">
      <h2>BarVisualizer.js</h2>
      <BarVisualizerToolbar
        numOfElements={numOfElements} 
        onElementsSliderChange={handleElementsSliderChange}

        currentDelay={animationDelay}
        onDelaySliderChange={handleDelaySliderChange}

        generateNewArray={newArray} 
        bubbleSort={bubbleSortFunction}
      />

      <BarVisualizerBody 
        numOfElements={numOfElements} 
        array={array}
        currentBars={currentBars}
        largerBar={largerBar}
        sorted={sorted}
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
