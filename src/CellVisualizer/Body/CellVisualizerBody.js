import '../../Styling/VisualizerBody.css';
import React from 'react';
import { motion } from "framer-motion";

function CellVisualizerBody(props) {

  const keys = [50, 20, 70, 40, 10, 60, 30, 100];

  return (
    <div className='cell-array-container'>
      {props.array.map((obj) => 
        <motion.div 
          className='cell-box'
          key={obj.key}
          style={ { aspectRatio: 1/1,
                    width: `${100/props.array.length}%`,
                    
                } }
          layout
          transition={{type:"spring", damping: 20, stiffness: 300}}
        > 
        {obj.value}
        </motion.div>
      )}
    </div>
  )
}

export default CellVisualizerBody;