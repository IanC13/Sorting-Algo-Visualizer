import React, {useState, useEffect} from 'react';
import '../Styling/VisualizerContainer.css';

import CellVisualizerToolbar from './Toolbar/CellVisualizerToolbar';

function CellVisualizer() {
  
  return (
    <div className='CellVisualizer'>
      <CellVisualizerToolbar />
    </div>
  )
}

export default CellVisualizer;