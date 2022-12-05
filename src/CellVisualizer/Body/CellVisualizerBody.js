import React from 'react';
import '../../Styling/VisualizerBody.css';

function CellVisualizerBody(props) {

  return (
    <div className='cell-array-container'>
      {props.array.map((value, id) => 
        <div 
          className='cell-box'
          key={id}

          style={ { aspectRatio: 1/1,
                    width: `${100/props.array.length}%`,
                    
                } }
        > 
        {value}
        </div>
      )}
    </div>
  )
}

export default CellVisualizerBody;