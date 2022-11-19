import React from 'react';
import './BarVisualizerBody.css';

const DEFAULT_COLOR = '#EA4C89';
const HIGHLIGHT_COLOR = 'turquoise';
const LARGER_COLOR = 'green'; // Color for the larger element when comparing
const SORTED_COLOR = 'MediumSpringGreen';

// Function component using React Hooks 
function BarVisualizerBody(props) {

  const numOfSpaces = props.numOfElements - 1;

  // render
  return (
    <div>
      <div
        className='array-container'
        // Gap and bar width is the same rn
        // the width is a percentage of the container where each percentage = 100(%)/(bars + spaces) %
        style={ { gap: `${100/(props.numOfElements + numOfSpaces)}%` } }
      >
        {props.array.map((value, id) =>
          <div
            className='array-bar'
            key={id}
            // Making of the bars
            style={ { height: `${(value/Math.max(...props.array)) * 100}%`,
                      width: `${100/(props.numOfElements + numOfSpaces)}%`,
                      // currentBars hold the 2 bars that we are comparing. change colors accordingly
                      backgroundColor: (props.sorted === true ? SORTED_COLOR : 
                                       (id === props.largerBar ? LARGER_COLOR : 
                                       (id === props.currentBars[0] || id === props.currentBars[1]) ? HIGHLIGHT_COLOR : 
                                       DEFAULT_COLOR)) 
                  } }
          >
          </div>
        )}
      </div>
    </div>
  );
}

export default BarVisualizerBody;