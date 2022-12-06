import React, {useState, useEffect} from 'react';
import '../Styling/VisualizerContainer.css';

import CellVisualizerToolbar from './Toolbar/CellVisualizerToolbar';
import CellVisualizerBody from './Body/CellVisualizerBody';

import { bubbleSortHelperCell } from '../Algorithms/BubbleSort';

const testArray = [
  [{key:5, value:5}, {key: 2, value: 2}, {key: 7, value: 7}, {key: 4, value: 4}, {key: 1, value: 1}, {key: 6, value: 6}, {key: 3, value: 3}, {key: 0, value: 1}],
  [{key:0, value:1}, {key: 2, value: 2}, {key: 7, value: 7}, {key: 4, value: 4}, {key: 1, value: 1}, {key: 6, value: 6}, {key: 3, value: 3}, {key: 5, value: 5}],
  [{key:0, value:1}, {key: 1, value: 1}, {key: 7, value: 7}, {key: 4, value: 4}, {key: 2, value: 2}, {key: 6, value: 6}, {key: 3, value: 3}, {key: 5, value: 5}],
  [{key:0, value:1}, {key: 1, value: 1}, {key: 2, value: 2}, {key: 4, value: 4}, {key: 7, value: 7}, {key: 6, value: 6}, {key: 3, value: 3}, {key: 5, value: 5}],
  [{key:0, value:1}, {key: 1, value: 1}, {key: 2, value: 2}, {key: 3, value: 3}, {key: 7, value: 7}, {key: 6, value: 6}, {key: 4, value: 4}, {key: 5, value: 5}],
  [{key:0, value:1}, {key: 1, value: 1}, {key: 2, value: 2}, {key: 3, value: 3}, {key: 4, value: 4}, {key: 6, value: 6}, {key: 7, value: 7}, {key: 5, value: 5}],
  [{key:0, value:1}, {key: 1, value: 1}, {key: 2, value: 2}, {key: 3, value: 3}, {key: 4, value: 4}, {key: 5, value: 5}, {key: 7, value: 7}, {key: 6, value: 6}],
  [{key:0, value:1}, {key: 1, value: 1}, {key: 2, value: 2}, {key: 3, value: 3}, {key: 4, value: 4}, {key: 5, value: 5}, {key: 6, value: 6}, {key: 7, value: 7}]
];

let count = 0;

function CellVisualizer() {

  const [array, setArray] = useState(testArray[0]);


  function bubbleSortFunction () {
    //bubbleSortHelperCell(array, setArray);
    count += 1;
    if (count === testArray.length) {
      count = 0;
    }
    setArray(testArray[count]);
  }

  return (
    <div className='CellVisualizer'>
      <CellVisualizerToolbar 

        bubbleSort={bubbleSortFunction}
      />

      <CellVisualizerBody 
        array={array}
      />
    </div>
  )
}

export default CellVisualizer;