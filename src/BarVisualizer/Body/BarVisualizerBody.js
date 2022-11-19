import React, { useState, useEffect } from 'react';
import './BarVisualizerBody.css';
import BarVisualizerToolbar from '../Toolbar/BarVisualizerToolbar';

import bubbleSort from '../../Algorithms/BubbleSort';

/*
  Body of Bar Visualizer
*/

// const NUMBER_OF_ITEMS = 100;
// const NUMBER_OF_SPACES = NUMBER_OF_ITEMS - 1;
const ANIMATION_DELAY_MS = 10;
const ANIMATION_COLOR_DELAY_MS = 250;

const DEFAULT_COLOR = '#EA4C89';
const HIGHLIGHT_COLOR = 'turquoise';
const LARGER_COLOR = 'green'; // Color for the larger element when comparing

// Function component using React Hooks 
function BarVisualizerBody(props) {
  // States
  // The array to be sorted
  const [array, setArray] = useState([]);
  
  // Keeps track of the 2 bars we are currently comparing
  const [currentBars, setCurrentBars] = useState([]);

  // Larger of the comparisons
  const [largerBar, setLarger] = useState();

  const numOfSpaces = props.numOfElements - 1;

  // componentDidMount eqv only 
  useEffect(function () {
    newArray();
  }, [])

  useEffect(function () {
    newArray(props.numOfElements)
  }, [props.numOfElements])

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
  }

  // Make an animations array, a 2 d array which holds all the comparison

  function bubbleSortFunction() {
    let {allArrayStates, animations, largerArray} = bubbleSort(array);

    const length = animations.length;

    // Delay from 2 same color highlighted bar to larger one highlighted with a different color
    let largerColorDelay = ANIMATION_COLOR_DELAY_MS;
    // Delay from 2 differently highlighted bar to swapping
    let swapDelay = largerColorDelay + ANIMATION_COLOR_DELAY_MS;

    // let largerColorDelay = 1000;
    // // Delay from 2 differently highlighted bar to swapping
    // let swapDelay = largerColorDelay + 10;

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
      }, i * (ANIMATION_DELAY_MS + (largerColorDelay + swapDelay)));
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

  // render
  return (
      //<BarVisualizerToolbar generateNewArray={newArray} bubbleSort={bubbleSortFunction} />
    <div>
      <div
        className='array-container'
        // Gap and bar width is the same rn
        // the width is a percentage of the container where each percentage = 100(%)/(bars + spaces) %
        style={ { gap: `${100/(props.numOfElements + numOfSpaces)}%` } }
      >
        {array.map((value, id) =>
          <div
            className='array-bar'
            key={id}
            // Making of the bars
            style={ { height: `${(value/Math.max(...array)) * 100}%`,
                      width: `${100/(props.numOfElements + numOfSpaces)}%`,
                      // currentBars hold the 2 bars that we are comparing. change colors accordingly
                      backgroundColor: (id === largerBar ? LARGER_COLOR : (id === currentBars[0] || id === currentBars[1]) ? HIGHLIGHT_COLOR : DEFAULT_COLOR) } }
          >
          </div>
        )}
      </div>
    </div>
  );
}

// Random integer from 1 to 1000
function randomInteger() {
  // (0 to 999) +1
  return Math.floor(Math.random() * 1000) + 1;
}



export default BarVisualizerBody;