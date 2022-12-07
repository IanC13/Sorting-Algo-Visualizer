import '../../Styling/VisualizerBody.css';
import React from 'react';
import { motion } from "framer-motion";

const DEFAULT_COLOR = '#A51C30';
const HIGHLIGHT_COLOR = '#808285';
const SORTED_COLOR = '#b79147';

function CellVisualizerBody(props) {

  return (
    <div className='cell-array-container'>
      {props.array.map((elementObject) => 
        <motion.div 
          className='cell-box'
          key={elementObject.key}
          style={ { aspectRatio: 1/1,
                    width: `${100/props.array.length}%`,
                    backgroundColor: 
                        (props.sorted === true ? SORTED_COLOR : 
                        (props.sortedElements !== undefined) && 
                         (props.sortedElements.includes(elementObject.key)) ? 
                            SORTED_COLOR : 
                         ((props.highlightedCells !== undefined) &&
                          (props.highlightedCells.includes(elementObject.key))) 
                            ? HIGHLIGHT_COLOR : 
                        DEFAULT_COLOR)
                } }

          // Framer Motion 
          layout
          transition={{type:"spring", damping: 20, stiffness: 300}}
        > 
        {elementObject.value}
        </motion.div>
      )}
    </div>
  )
}

export default CellVisualizerBody;