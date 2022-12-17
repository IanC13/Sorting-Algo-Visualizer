import '../../Styling/VisualizerBody.css';
import React from 'react';
import { motion } from "framer-motion";

const DEFAULT_COLOR = '#A51C30';
const HIGHLIGHT_COLOR = '#808285';
const SORTED_COLOR = '#b79147';
const GREY_OUT = '#a51c3120';

function CellVisualizerBody(props) {

  function Auxillary() {
    if (props.auxillaryArrays.length !== 0) {
      return (
        <div className='auxillary'>
          {props.auxillaryArrays.map((levels, levelIdx) => 
            <div 
              className='levels'
            >
              {levels.map((subarrays, subIdx) => 
                <div 
                  className='cell-array'
                >
                  {subarrays.map((elementObject) => 
                    <motion.div
                      className='cell-box'
                      key={elementObject.key}
                      style={{ aspectRatio: 1/1,
                              width: `min(${50}px, ${5}vw)`,
                              backgroundColor: (props.auxHighlightedCells[levelIdx][subIdx].includes(elementObject.key)) ? HIGHLIGHT_COLOR : 
                                              (props.auxGreyOutCells[levelIdx][subIdx].includes(elementObject.key)) ? GREY_OUT : DEFAULT_COLOR
                              
                              }}
                      // Framer Motion
                      layout
                      transition={{type:"spring", damping: 20, stiffness: 300}}
                    >
                    {elementObject.value}
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )
    }
  }


  return (
    <div className='cell-array-container'>
      <div className='main-array'>
        <div className='cell-array'>
          {props.array.map((elementObject) =>
            <motion.div
              className='cell-box'
              key={elementObject.key}
              style={ { aspectRatio: 1/1,
                        width: (props.auxillaryArrays.length === 0 ? 
                            `${100/(props.array.length)}%` : 
                            `min(${50}px, ${5}vw)`
                        ),
                        backgroundColor: (
                            (props.sorted === true) ? SORTED_COLOR :
                            (props.sortedElements !== undefined) &&
                            (props.sortedElements.includes(elementObject.key)) ?
                                SORTED_COLOR :
                            ((props.highlightedCells !== undefined) &&
                             (props.highlightedCells.includes(
                                  elementObject.key))) ? HIGHLIGHT_COLOR :
                            (props.greyOutCells.includes(elementObject.key)) ?
                                GREY_OUT : DEFAULT_COLOR)
                    } }
              // Framer Motion
              layout
              transition={{type:"spring", damping: 20, stiffness: 300}}
            >
            {elementObject.value}
            </motion.div>
          )}
        </div>
      </div>
      
      <Auxillary />
      
    </div>
  )
}

export default CellVisualizerBody;