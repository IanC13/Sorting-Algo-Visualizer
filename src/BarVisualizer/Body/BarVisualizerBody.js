import React, { useState, useEffect } from 'react';
import './BarVisualizerBody.css';

/*
  Body of Bar Visualizer
*/

const NUMBER_OF_ITEMS = 100;
const NUMBER_OF_SPACES = NUMBER_OF_ITEMS - 1;

// Function component using React Hooks 
function BarVisualizerBody() {
  // States
  const [array, setArray] = useState([]);

  // componentDidMount & componentDidUpdate
  useEffect(function () {
    newArray();
  }, [])

  function newArray() {
    let tempArray = [];

    // Generate 100 random numbers to put in array
    for (let i = 0; i < NUMBER_OF_ITEMS; i++) {
        tempArray.push(randomInteger());
    }; 

    // Set array state
    setArray(tempArray);
  }

  // render
  return (
    <div 
      className='array-container'
      // Gap and bar width is the same rn
      // the width is a percentage of the container where each percentage = 100(%)/(bars + spaces) %
      style={ { gap: `${100/(NUMBER_OF_ITEMS + NUMBER_OF_SPACES)}%` } }
    >
      {array.map((value, id) => 
        <div 
          className='array-bar'
          key={id}
          // Making of the bars
          style={ { height: `${(value/Math.max(...array)) * 100}%`, 
                    width: `${100/(NUMBER_OF_ITEMS + NUMBER_OF_SPACES)}%` } }
        >
        </div> 
      )}

    </div>
  );
}

// Random integer from 1 to 1000
function randomInteger() {
  // (0 to 999) +1
  return Math.floor(Math.random() * 1000) + 1;
}

export default BarVisualizerBody;