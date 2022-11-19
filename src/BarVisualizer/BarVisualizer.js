import React, {useState, useEffect} from 'react';
import BarVisualizerBody from './Body/BarVisualizerBody';
import BarVisualizerToolbar from './Toolbar/BarVisualizerToolbar';
import './BarVisualizer.css';


function BarVisualizer() {
  // Lifting the state up
  // Number of elements in the array 
  const [numOfElements, setNumOfElements] = useState(10);

  function handleElementsChange(value) {
    setNumOfElements(value);
  }

  return (
    <div className="BarVisualizer">
      <h2>BarVisualizer.js</h2>
      <BarVisualizerToolbar numOfElements={numOfElements} onElementsSliderChange={handleElementsChange}/>
      <BarVisualizerBody numOfElements={numOfElements} />
    </div>
  );
}

export default BarVisualizer;
