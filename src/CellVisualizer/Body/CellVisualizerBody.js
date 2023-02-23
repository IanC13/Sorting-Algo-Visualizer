import '../../Styling/VisualizerBody.css';
import React, { useState } from 'react';
import { motion } from "framer-motion";

const DEFAULT_COLOR = '#A51C30';
const HIGHLIGHT_COLOR = '#808285';
const SORTED_COLOR = '#b79147';
const GREY_OUT = '#a51c3120';

function CellVisualizerBody(props) {
  const [history, setHistory] = useState([]);

  function Auxillary() {
    /* Determine the subarray that is newly getting displayed to screen. 
     * Otherwise every subarray gets animated as we are re rendering everything.
     * This subarray is determined either in history or a last subarray that is
     * not 0 length   
     */
    
    let length = props.auxillaryArrays.length;
    let cellsToAnimate = [];

    let done = false;

    // Loop backwards through each level
    for (let i = length-1; i > -1; i--) {
      // Loop backwards through each subarray in each level
      let l2 = props.auxillaryArrays[i].length;

      for (let j = l2 -1; j > -1; j--) {
        cellsToAnimate = [];
        let l3 = props.auxillaryArrays[i][j].length;

        // If length of subarray is not 0 i.e. it is currently being displayed
        if (l3 !== 0) {
          // level idx
          cellsToAnimate.push(i);
          // subarray idx
          cellsToAnimate.push(j);

          let historyContains = false;
          
          if (history.length !== 0) {
            let histLength = history.length;
            
            // Loop through history
            for (let k = 0; k < histLength; k++) {
              // Search if it is in history
              if ((history[k][0] === i && history[k][1] === j)) {
                historyContains = true;
                break;
              }
            }

            // If it is not in history, cellsToAnimate OK, add to history, break
            if (historyContains === false) {
              let tmp = history;
              tmp.push(cellsToAnimate);
              setHistory(tmp);
              done = true;
            }

          } else {
            let tmp = history;
            tmp.push(cellsToAnimate);
            setHistory(tmp);
          }

          // done = true;
        }
        if (done){break};
      }
      if (done){break};
    }
    
    /* cannot just use cellsToAnimate as it is getting auto overriden to [0, 0]
    /* So we just take the last element in history and use that as cells to 
    /* animate */
    cellsToAnimate = history[history.length -1];
    if (cellsToAnimate === undefined) {
      cellsToAnimate = [];
    } 

    // If statement so that primary array is not pushed up when there are no 
    // aux arrays
    if (length !== 0) {
      return (
        <div className='auxillary'>
          {props.auxillaryArrays.map((levels, levelIdx) => 
            <div 
              className='levels'
              key = {levelIdx}
            >
              {levels.map((subarrays, subIdx) => 
                <motion.div 
                  className='cell-array'
                  key={subIdx}

                  // Framer Motion
                  layout
                  initial={{ 
                      scale: (cellsToAnimate[0] === levelIdx &&
                              cellsToAnimate[1] === subIdx)
                              ? 0.7 : 1,
                      opacity: (cellsToAnimate[0] === levelIdx &&
                              cellsToAnimate[1] === subIdx)
                              ? 0.5 : 1 
                  }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{type:"spring", damping: 20, stiffness: 300}}
                >
                  {subarrays.map((elementObject) => 
                    <div
                      className='cell-box'
                      key={elementObject.key}
                      style={{ aspectRatio: 1/1,
                              width: `min(${55}px, ${5}vw)`,
                              backgroundColor: 
                                  (props.auxSortedElements[levelIdx]
                                      [subIdx].includes(elementObject.key)) ? 
                                          SORTED_COLOR :
                                  (props.auxSorted === true) ? GREY_OUT :
                                  (props.auxHighlightedCells[levelIdx]
                                      [subIdx].includes(elementObject.key)) ? 
                                          HIGHLIGHT_COLOR : 
                                  (props.auxGreyOutCells[levelIdx]
                                      [subIdx].includes(elementObject.key)) ? 
                                          GREY_OUT : DEFAULT_COLOR
                              }}
                    >
                    {elementObject.value}
                    </div>
                  )}
                </motion.div>
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
                            `min(${55}px, ${5}vw)`
                        ),
                        backgroundColor: (
                            (props.sorted === true) ? SORTED_COLOR :
                            (props.auxSorted === true) ? GREY_OUT :
                            ((props.highlightedCells !== undefined) &&
                             (props.highlightedCells.includes(
                                  elementObject.key))) ? HIGHLIGHT_COLOR :
                            (props.sortedElements !== undefined) &&
                            (props.sortedElements.includes(elementObject.key)) ?
                                SORTED_COLOR :
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