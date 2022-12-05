import React, {useState, useEffect} from 'react';
import '../Styling/VisualizerContainer.css';

import CellVisualizerToolbar from './Toolbar/CellVisualizerToolbar';
import CellVisualizerBody from './Body/CellVisualizerBody';

function CellVisualizer() {

  const [array, setArray] = useState([5, 2, 7, 4, 1, 6, 3, 0, 2]);

  return (
    <div className='CellVisualizer'>
      <CellVisualizerToolbar />

      <CellVisualizerBody 
        array={array}
      />
    </div>
  )
}

export default CellVisualizer;