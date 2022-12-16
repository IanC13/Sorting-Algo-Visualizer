import { toContainElement } from "@testing-library/jest-dom/dist/matchers";

function mergeSortHelperCell(array) {
  let newArray = array.slice();
  let length = newArray.length;

  let allArrayStates = [];
  let animations = [];
  let sortedElements = [];
  let auxillaryArrays = [];
  let greyOutCells = [];
  let auxGreyOutCells = [];


  // The number of levels of division 
  let height = Math.log2(length);

  let callDepth = -1;

  let divisionInsertPosition = [];
  
  // Subarray grey out pos
  let subArrayPos = {};
  
  /* Keeps track of the position in the sub arrays of auxillaryArrays we are 
   * inserting in. Each idx of this array represents the insertion position in 
   * that level.
   */
  for (let i = 0; i < height*2; i++) {
    divisionInsertPosition.push(0);
    subArrayPos[i] = 0;
  }


  ({allArrayStates, animations, sortedElements, auxillaryArrays} = 
        mergeSort(
            newArray,
            /* start Index */ 0, 
            /* end Index */ length-1, 
            allArrayStates,
            animations,
            sortedElements,
            auxillaryArrays,
            greyOutCells,
            auxGreyOutCells,
            callDepth,
            height,
            divisionInsertPosition,
            subArrayPos            
        )
  );

  return { allArrayStates, animations, sortedElements, auxillaryArrays, greyOutCells, auxGreyOutCells };
}

function mergeSort(
    array, 
    leftIdx, 
    rightIdx, 
    allArrayStates, 
    animations, 
    sortedElements, 
    auxillaryArrays,
    greyOutCells,
    auxGreyOutCells,
    callDepth,
    height,
    divisionInsertPosition,
    subArrayPos ) {

  callDepth += 1;
  
  let currentArrayLength = rightIdx - leftIdx + 1;
  
  if (leftIdx < rightIdx) {
    // length of passed in array

    buildAuxAnimationPlaceholder(auxillaryArrays, height);
    // Find middle of array
    let midIdx = Math.floor((leftIdx + rightIdx) / 2);

    /* Inserts the left part of the array into auxillary array to render the 
     * recursion
     */
    auxillaryArrays[auxillaryArrays.length -1][callDepth].splice(
        divisionInsertPosition[callDepth], 1, array.slice(leftIdx, midIdx+1));
    divisionInsertPosition[callDepth] += 1;
    
    // grey out cells of primary array
    findGreyOutCells(greyOutCells, array, midIdx+1, currentArrayLength/2, callDepth);    

    // grey out cells of aux arrays by level
    findAuxGreyOutCells(auxGreyOutCells, array, midIdx+1, currentArrayLength/2, callDepth, subArrayPos, height);
   

    // Recursively call mergeSort on left part
    mergeSort(
        array, 
        leftIdx, 
        midIdx, 
        allArrayStates, 
        animations, 
        sortedElements, 
        auxillaryArrays,
        greyOutCells,
        auxGreyOutCells,
        callDepth,
        height,
        divisionInsertPosition,
        subArrayPos 
    );
    
    buildAuxAnimationPlaceholder(auxillaryArrays, height);
    // Inserts right part of array for rendering
    auxillaryArrays[auxillaryArrays.length -1][callDepth].splice(
        divisionInsertPosition[callDepth], 1, array.slice(midIdx+1, rightIdx+1));
    divisionInsertPosition[callDepth] += 1;
    
    findGreyOutCells(greyOutCells, array, leftIdx, currentArrayLength/2, callDepth); 

    findAuxGreyOutCells(auxGreyOutCells, array, leftIdx, currentArrayLength/2, callDepth, subArrayPos, height);
    subArrayPos[callDepth] += 1;

    mergeSort(
        array, 
        midIdx + 1, 
        rightIdx, 
        allArrayStates, 
        animations, 
        sortedElements, 
        auxillaryArrays,
        greyOutCells,
        auxGreyOutCells,
        callDepth,
        height,
        divisionInsertPosition,
        subArrayPos
    );
    
    // Un grey sub arrays involved in merging before merge
    auxUngrey(auxGreyOutCells, callDepth, height, divisionInsertPosition)

    merge(
        array, 
        leftIdx, 
        midIdx, 
        rightIdx, 
        allArrayStates, 
        animations, 
        sortedElements, 
        auxillaryArrays,
        greyOutCells,
        auxGreyOutCells,
        callDepth,
        height,
        divisionInsertPosition
    );
    
    // Grey out merged parts
    if (callDepth !== 0) {
      findSortedGreyOutCells(auxGreyOutCells, array, rightIdx+1, callDepth, height);
      greyOutCells.push(greyOutCells[greyOutCells.length -1]);
      buildAuxAnimationPlaceholder(auxillaryArrays, height);
    }
  }

  return {allArrayStates, animations, sortedElements, auxillaryArrays, greyOutCells , auxGreyOutCells}
}

// array is initial array
function merge(
    array, 
    leftIdx, 
    midIdx, 
    rightIdx, 
    allArrayStates, 
    animations, 
    sortedElements, 
    auxillaryArrays,
    greyOutCells,
    auxGreyOutCells,
    callDepth,
    height,
    divisionInsertPosition) {
  
  /* Keeps track of the position of the sub array in auxillaryArrays we are 
   * inserting in. In mergeSort function, this position was determined by 
   * callDepth
   */
  let mergeInsertionPosition = height*2 - 1 - callDepth;
  
  // Lengths of left and right array
  let lLength = midIdx - leftIdx + 1;
  let rLength = rightIdx - midIdx;

  // Copy of the left and right array under merge
  let leftArray = new Array(lLength);
  let rightArray = new Array(rLength);

  // Copy values into the temp arrays
  for (let i = 0; i < lLength; i++) {
    leftArray[i] = array[leftIdx + i];
  }

  for (let j = 0; j < rLength; j++) {
    rightArray[j] = array[midIdx + 1 + j];
  }

  // Looping index
  let l = 0; // left array
  let r = 0; // right array
  let a = leftIdx; // merged array


  while (l < lLength && r < rLength) {
    if (leftArray[l].value <= rightArray[r].value) {         
      array[a] = leftArray[l];
      l += 1;
    } else {
      array[a] = rightArray[r];
      r += 1;
    }
    a += 1;

    buildAuxAnimationPlaceholder(auxillaryArrays, height);
    auxillaryArrays[auxillaryArrays.length -1][mergeInsertionPosition].splice(
        divisionInsertPosition[mergeInsertionPosition], 
        1, 
        array.slice(leftIdx, a));
    
    greyOutCells.push(greyOutCells[greyOutCells.length -1]);    

    if (a !== leftIdx+1) {
      auxGreyOutCells.push(structuredClone(auxGreyOutCells[auxGreyOutCells.length -1]))
    }
  }

  while (l < lLength) {
    array[a] = leftArray[l];
    a += 1;
    l += 1    

    buildAuxAnimationPlaceholder(auxillaryArrays, height);
    auxillaryArrays[auxillaryArrays.length -1][mergeInsertionPosition].splice(
        divisionInsertPosition[mergeInsertionPosition], 
        1, 
        array.slice(leftIdx, a));
    greyOutCells.push(greyOutCells[greyOutCells.length -1]);
    auxGreyOutCells.push(structuredClone(auxGreyOutCells[auxGreyOutCells.length -1]))
  }

  while (r < rLength) {
    array[a] = rightArray[r];
    a += 1;
    r += 1;

    buildAuxAnimationPlaceholder(auxillaryArrays, height);
    auxillaryArrays[auxillaryArrays.length -1][mergeInsertionPosition].splice(
        divisionInsertPosition[mergeInsertionPosition], 
        1, 
        array.slice(leftIdx, a));

    greyOutCells.push(greyOutCells[greyOutCells.length -1]);
    auxGreyOutCells.push(structuredClone(auxGreyOutCells[auxGreyOutCells.length -1]))
  }
  

  divisionInsertPosition[mergeInsertionPosition] += 1;
    
  return {allArrayStates, animations, sortedElements, auxillaryArrays, greyOutCells , auxGreyOutCells};
  
}


function buildAuxAnimationPlaceholder(auxillaryArrays, height) {
  // On all except first call,
  if (auxillaryArrays.length !== 0) {
    // Push a deep copy of the last states
    // Each idx of auxillaryArrays is a particular state - animations
    auxillaryArrays.push(structuredClone(auxillaryArrays[auxillaryArrays.length -1]));
  } else {
    // First call
    auxillaryArrays.push([]);

    /* Push place holder arrays for the dividing and merge levels so that the 
    * rendered cells are aligned correctly 
    */

    // For each level - height * 2 as we take into account the merge levels
    for (let i = 0; i < height*2; i++) {
      // sub array for each level
      auxillaryArrays[auxillaryArrays.length-1].push([]);

      // Calculates the number of sub arrays each level will have
      // when i > height, we are calculating for merge levels
      let power = i < height ? Math.pow(2, i+1) : Math.pow(2, height*2 - i -1);

      for (let j = 0; j < power; j++) {
        auxillaryArrays[auxillaryArrays.length-1]
            [auxillaryArrays[auxillaryArrays.length-1].length-1].push([]);
      }
    }
    /* We are left with [ [[] --> 2^(i+1)], --> height NoOfTimes,
    * [[] --> 2^(height*2 - i - 1)], --> height NoOfTimes ]    
    */
  }
}

function findGreyOutCells(cellArray, array, start, length, callDepth) {
  if (callDepth === 0) {
    // new animation idx
    cellArray.push([]);
  
    for (let i = start; i < start+length; i++) {
      cellArray[cellArray.length -1].push(array[i].key);
    }
  } else {
    cellArray.push(cellArray[cellArray.length -1]);
  }
}

function findAuxGreyOutCells(cellArray, array, start, length, callDepth, subArrayPos, height){
  if (cellArray.length === 0) {
    // Push placeholders
    cellArray.push([]);
    // for (let i = 0; i < 6; i++) {
    //   cellArray[cellArray.length -1].push([]);
    // }

    for (let i = 0; i < height*2; i++) {
      cellArray[cellArray.length-1].push([]);

      let power = i < height ? Math.pow(2, i+1) : Math.pow(2, height*2 - i -1);

      for (let j = 0; j < power; j++) {
        cellArray[cellArray.length-1]
            [cellArray[cellArray.length-1].length-1].push([]);
      }
    }
  } else {
    if (callDepth !== 0) {
      // Push previous state so other levels don't change
      cellArray.push(structuredClone(cellArray[cellArray.length -1]));

      let tmp = [];
      
      // Color the passed in array
      for (let i = start; i < start+length; i++) {
        tmp.push(array[i].key);
      }
      
      cellArray[cellArray.length -1][callDepth-1].splice(subArrayPos[callDepth], 1, tmp);

    } else {
      cellArray.push(cellArray[cellArray.length -1]);
    }
  }
}

function auxUngrey(aux, callDepth, height, divisionInsertPosition) {
  aux.push(structuredClone(aux[aux.length -1]));


  for (let i = callDepth-1; i < height*2 - 1 - callDepth; i++) {      
    // Semi hard coded
    if (callDepth === 1) {

      let sub = i < height ? Math.pow(2, i) : Math.pow(2, height*2 - i -2);
      let insPos = divisionInsertPosition[i];

      for (let j = insPos-sub; j < insPos; j++) {
        aux[aux.length -1][i].splice(j, 1, []);
      }
      
    } else if (callDepth === 2) {
      let insPos = divisionInsertPosition[i];
      for (let j = insPos-1; j < insPos; j++) {
        aux[aux.length -1][i].splice(j, 1, []);
      }
    } else {
      aux[aux.length -1][i] = [];

      let power = i < height ? Math.pow(2, i+1) : Math.pow(2, height*2 - i -1);

      for (let j = 0; j < power; j++) {
        aux[aux.length -1][i].push([]);
      }
    }
  }
}

function findSortedGreyOutCells(cellArray, array, endIdx, callDepth, height) {
  cellArray.push(structuredClone(cellArray[cellArray.length -1]));
  
  // For every level in the merge, add every cell currently in the level to grey out
  for (let i = callDepth-1; i < height*2-callDepth; i++) {
    let tmp = [];

    for (let j = 0; j < endIdx; j++) {
      tmp.push(array[j].key);
    }

    for (let j = 0; j < cellArray[cellArray.length -1][i].length; j++) {
      cellArray[cellArray.length -1][i].splice(j, 1, tmp);
    }
  }
}

export default mergeSortHelperCell;