import React from 'react';
import '../../Styling/VisualizerBody.css';

const DEFAULT_COLOR = '#A51C30';
const HIGHLIGHT_COLOR = '#808285';
const SPECIAL_COLOR = '#000000'; 
const SORTED_COLOR = '#b79147';
const GREY_OUT = '#a51c3120';

// Function component using React Hooks 
function BarVisualizerBody(props) {

  const numOfSpaces = props.numOfElements - 1;

  // render
  return (
    <div
      className='bar-array-container'
      // Gap and bar width is the same 
      // the width is a percentage of the container where each percentage = 
      // 100(%)/(bars + spaces) %
      style={ { gap: `${100/(props.numOfElements + numOfSpaces)}%`,
                // Decrease display area if numOfElements < 30 so that the bars 
                // aren't unbearably huge 
                padding: (props.numOfElements < 30) ? 
                    `${0}% ${20}% ${0}% ${20}%` : `inherit`
            } }
    >
      {props.array.map((value, id) =>
        <div
          className='array-bar'
          key={id}
          // Making of the bars
          style={ { height: `${(value/Math.max(...props.array)) * 100}%`,
                    width: `${100/(props.numOfElements + numOfSpaces)}%`,
                    backgroundColor: 
                        (props.sorted === true ? SORTED_COLOR : 
                        (id === props.specialBar ? SPECIAL_COLOR : 
                        (props.currentBars.includes(id)) ? HIGHLIGHT_COLOR : 
                        (props.sortedBars.includes(id) ? SORTED_COLOR :
                        (!props.greyOutBars.includes(id) ? GREY_OUT :
                        DEFAULT_COLOR))))
                } }
        >
        </div>
      )}
    </div>
  );
}

export default BarVisualizerBody;