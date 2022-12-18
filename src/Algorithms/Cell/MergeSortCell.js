function mergeSortHelperCell(array) {
  let newArray = array.slice();
  let staticArray = array.slice();
  let length = newArray.length;

  let allArrayStates = [];
  let auxAnimations = [];
  let auxSortedElements = [];
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


  ({allArrayStates, 
    auxAnimations, 
    auxSortedElements, 
    auxillaryArrays, 
    greyOutCells , 
    auxGreyOutCells} = 
        mergeSort(
                newArray,
                /* start Index */ 0, 
                /* end Index */ length-1, 
                staticArray,
                allArrayStates,
                auxAnimations,
                auxSortedElements,
                auxillaryArrays,
                greyOutCells,
                auxGreyOutCells,
                callDepth,
                height,
                divisionInsertPosition,
                subArrayPos            
        )
  );
  

  // Add 0th state where it is just primary array ==============================
  allArrayStates.splice(0, 0, allArrayStates[0]);

  // Add structure on the end
  buildLevelStructure(auxillaryArrays, height);
  // splice that into the front
  auxillaryArrays.splice(0, 0, auxillaryArrays[auxillaryArrays.length-1]);
  // remove tmp from back
  auxillaryArrays = auxillaryArrays.slice(0, auxillaryArrays.length-1);

  buildLevelStructure(auxAnimations, height);
  auxAnimations.splice(0, 0, auxAnimations[auxAnimations.length-1]);
  auxAnimations = auxAnimations.slice(0, auxAnimations.length-1);

  greyOutCells.splice(0, 0, []);

  buildLevelStructure(auxGreyOutCells, height);
  auxGreyOutCells.splice(0, 0, auxGreyOutCells[auxGreyOutCells.length-1]);
  auxGreyOutCells = auxGreyOutCells.slice(0, auxGreyOutCells.length-1);

  auxSortedElements.splice(0, 0, []);
  let tmpIdx;
  for (let i = auxillaryArrays.length-1; i > -1; i--) {
    if (auxillaryArrays[i][auxillaryArrays[i].length-1][0].length === 0) {
      tmpIdx = i;
      break;
    }
  }
  tmpIdx += 1;

  for (let i = tmpIdx; i < auxillaryArrays.length; i++) {
    let tmpLength = auxillaryArrays[i][auxillaryArrays[i].length-1][0].length;
    for (let j = 0; j < tmpLength; j++) {
      auxSortedElements[i][auxillaryArrays[i].length-1][0].push(
          auxillaryArrays[i][auxillaryArrays[i].length-1][0][j].key);
    }

    
  }

  // ===========================================================================

  return { 
      allArrayStates, 
      auxSortedElements, 
      auxillaryArrays, 
      auxAnimations, 
      greyOutCells, 
      auxGreyOutCells 
  };
}

function mergeSort(
    array, 
    leftIdx, 
    rightIdx, 
    staticArray,
    allArrayStates, 
    auxAnimations,
    auxSortedElements, 
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

    // Find middle of array
    let midIdx = Math.floor((leftIdx + rightIdx) / 2);
    

    // ============================== ANIMATIONS ===============================
    /* Inserts the left part of the array into auxillary array to render the 
    * recursion
    */
    buildAuxAnimationPlaceholder(auxillaryArrays, height);
    auxillaryArrays[auxillaryArrays.length -1][callDepth].splice(
        divisionInsertPosition[callDepth], 1, array.slice(leftIdx, midIdx+1));
    divisionInsertPosition[callDepth] += 1;
    
    // grey out cells of primary array
    findGreyOutCells(
        greyOutCells, array, midIdx+1, currentArrayLength/2, callDepth);    

    // grey out cells of aux arrays by level
    findAuxGreyOutCells(
        auxGreyOutCells, 
        array, 
        midIdx+1, 
        currentArrayLength/2, 
        callDepth, 
        subArrayPos, 
        height
    );

    allArrayStates.push([...staticArray]);
    buildAuxAnimationPlaceholder(auxAnimations, height);
    buildAuxAnimationPlaceholder(auxSortedElements, height);
    // =========================================================================

    // Recursively call mergeSort on left part
    mergeSort(
        array, 
        leftIdx, 
        midIdx, 
        staticArray,
        allArrayStates, 
        auxAnimations,
        auxSortedElements, 
        auxillaryArrays,
        greyOutCells,
        auxGreyOutCells,
        callDepth,
        height,
        divisionInsertPosition,
        subArrayPos 
    );
    
    // ============================== ANIMATIONS ===============================
    buildAuxAnimationPlaceholder(auxillaryArrays, height);
    // Inserts right part of array for rendering
    auxillaryArrays[auxillaryArrays.length -1][callDepth].splice(
        divisionInsertPosition[callDepth], 1, array.slice(midIdx+1, rightIdx+1));
    divisionInsertPosition[callDepth] += 1;
    
    findGreyOutCells(
        greyOutCells, array, leftIdx, currentArrayLength/2, callDepth); 

    findAuxGreyOutCells(
        auxGreyOutCells, 
        array, 
        leftIdx, 
        currentArrayLength/2, 
        callDepth, 
        subArrayPos, 
        height
    );
    subArrayPos[callDepth] += 1;

    allArrayStates.push([...staticArray]);
    buildLevelStructure(auxAnimations, height);
    buildAuxAnimationPlaceholder(auxSortedElements, height);
    // =========================================================================

    mergeSort(
        array, 
        midIdx + 1, 
        rightIdx, 
        staticArray,
        allArrayStates, 
        auxAnimations,
        auxSortedElements, 
        auxillaryArrays,
        greyOutCells,
        auxGreyOutCells,
        callDepth,
        height,
        divisionInsertPosition,
        subArrayPos
    );
    
    // ============================== ANIMATIONS ===============================
    // Un grey sub arrays involved in merging before merge
    auxUngrey(auxGreyOutCells, callDepth, height, divisionInsertPosition);
    
    if(callDepth === 0) {
      findGreyOutCells(greyOutCells, array, 0, 0, callDepth);
    }
    // =========================================================================

    merge(
        array, 
        leftIdx, 
        midIdx, 
        rightIdx, 
        staticArray,
        allArrayStates, 
        auxAnimations,
        auxSortedElements, 
        auxillaryArrays,
        greyOutCells,
        auxGreyOutCells,
        callDepth,
        height,
        divisionInsertPosition
    );
    
    // ============================== ANIMATIONS ===============================
    // Grey out merged parts
    if (callDepth !== 0) {
      findSortedGreyOutCells(
          auxGreyOutCells, array, rightIdx+1, callDepth, height);
      greyOutCells.push(greyOutCells[greyOutCells.length -1]);
      buildAuxAnimationPlaceholder(auxillaryArrays, height);
      allArrayStates.push([...staticArray]);
      buildLevelStructure(auxAnimations, height);
      buildAuxAnimationPlaceholder(auxSortedElements, height);
    }
    // =========================================================================
  }

  return {
    allArrayStates, 
    auxAnimations, 
    auxSortedElements, 
    auxillaryArrays, 
    greyOutCells , 
    auxGreyOutCells
  }
}

// array is initial array
function merge(
    array, 
    leftIdx, 
    midIdx, 
    rightIdx, 
    staticArray,
    allArrayStates, 
    auxAnimations,
    auxSortedElements, 
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
    let levelLength = auxAnimations[auxAnimations.length -1][callDepth].length;

    // ============================== ANIMATIONS ===============================
    // Only happens once
    if (l === 0 && r === 0) {
      buildAuxAnimationPlaceholder(auxillaryArrays, height);
      greyOutCells.push(greyOutCells[greyOutCells.length -1]);
      if (a !== leftIdx) {
        auxGreyOutCells.push(structuredClone(auxGreyOutCells[auxGreyOutCells.length -1]));
      }
      allArrayStates.push([...staticArray]);
  
      buildLevelStructure(auxAnimations, height);
      for (let i = 0; i < levelLength; i++){
        auxAnimations[auxAnimations.length -1][height*2 - 2 - callDepth][i]
            .push(leftArray[l].key);
        auxAnimations[auxAnimations.length -1][height*2 - 2 - callDepth][i]
            .push(rightArray[r].key);
      }
      buildAuxAnimationPlaceholder(auxSortedElements, height);
    }
    // =========================================================================

    if (leftArray[l].value <= rightArray[r].value) {         
      array[a] = leftArray[l];
      l += 1;

      // ============================ ANIMATIONS ===============================
      buildLevelStructure(auxAnimations, height);
      for (let j = 0; j < levelLength; j++){
        auxAnimations[auxAnimations.length -1][height*2 - 2 - callDepth][j]
            .push(rightArray[r].key);
        if (l < lLength) {
          auxAnimations[auxAnimations.length -1][height*2 - 2 - callDepth][j]
              .push(leftArray[l].key);
        }
      }
      // =======================================================================

    } else {
      array[a] = rightArray[r];
      r += 1;

      // ============================ ANIMATIONS ===============================
      buildLevelStructure(auxAnimations, height);
      for (let j = 0; j < levelLength; j++){
        auxAnimations[auxAnimations.length -1][height*2 - 2 - callDepth][j]
            .push(leftArray[l].key);
        if (r < rLength) {
          auxAnimations[auxAnimations.length -1][height*2 - 2 - callDepth][j]
              .push(rightArray[r].key);
        }
      }
      // =======================================================================
      
    }
    a += 1;

    // ============================= ANIMATIONS ================================
    buildAuxAnimationPlaceholder(auxillaryArrays, height);
    auxillaryArrays[auxillaryArrays.length -1][mergeInsertionPosition].splice(
        divisionInsertPosition[mergeInsertionPosition], 
        1, 
        array.slice(leftIdx, a));
    greyOutCells.push(greyOutCells[greyOutCells.length -1]);    
    auxGreyOutCells.push(structuredClone(
        auxGreyOutCells[auxGreyOutCells.length -1]));
    allArrayStates.push([...staticArray]);
    buildAuxAnimationPlaceholder(auxSortedElements, height);
    // =========================================================================
  }

  while (l < lLength) {
    array[a] = leftArray[l];
    a += 1;
    l += 1    

    // ============================= ANIMATIONS ================================
    buildAuxAnimationPlaceholder(auxillaryArrays, height);
    auxillaryArrays[auxillaryArrays.length -1][mergeInsertionPosition].splice(
        divisionInsertPosition[mergeInsertionPosition], 
        1, 
        array.slice(leftIdx, a));
    greyOutCells.push(greyOutCells[greyOutCells.length -1]);
    auxGreyOutCells.push(structuredClone(
        auxGreyOutCells[auxGreyOutCells.length -1]))

    allArrayStates.push([...staticArray]);
    
    let levelLength = auxAnimations[auxAnimations.length -1][callDepth].length;
    buildLevelStructure(auxAnimations, height);
    for (let j = 0; j < levelLength; j++){
      if (l < lLength) {
        auxAnimations[auxAnimations.length -1][height*2 - 2 - callDepth][j]
            .push(leftArray[l].key);
      }
    }
    buildAuxAnimationPlaceholder(auxSortedElements, height);
    // =========================================================================
  }

  while (r < rLength) {
    array[a] = rightArray[r];
    a += 1;
    r += 1;

    // ============================= ANIMATIONS ================================
    buildAuxAnimationPlaceholder(auxillaryArrays, height);
    auxillaryArrays[auxillaryArrays.length -1][mergeInsertionPosition].splice(
        divisionInsertPosition[mergeInsertionPosition], 
        1, 
        array.slice(leftIdx, a));

    greyOutCells.push(greyOutCells[greyOutCells.length -1]);
    auxGreyOutCells.push(structuredClone(
        auxGreyOutCells[auxGreyOutCells.length -1]))
    allArrayStates.push([...staticArray]);

    let levelLength = auxAnimations[auxAnimations.length -1][callDepth].length;
    buildLevelStructure(auxAnimations, height);
    for (let j = 0; j < levelLength; j++){
      if (r < rLength) {
        auxAnimations[auxAnimations.length -1][height*2 - 2 - callDepth][j]
            .push(rightArray[r].key);
      }
    }
    buildAuxAnimationPlaceholder(auxSortedElements, height);
    // =========================================================================
  }

  divisionInsertPosition[mergeInsertionPosition] += 1;
    
  return {
    allArrayStates, 
    auxAnimations, 
    auxSortedElements, 
    auxillaryArrays, 
    greyOutCells , 
    auxGreyOutCells
  };
  
}


function buildAuxAnimationPlaceholder(array, height) {
  // On all except first call,
  if (array.length !== 0) {
    // Push a deep copy of the last states
    // Each idx of auxillaryArrays is a particular state - animations
    array.push(structuredClone(array[array.length -1]));
  } else {
    /* Push place holder arrays for the dividing and merge levels so that the 
    * rendered cells are aligned correctly 
    */
    buildLevelStructure(array, height);
    
    /* We are left with [ [[] --> 2^(i+1)], --> height NoOfTimes,
    * [[] --> 2^(height*2 - i - 1)], --> height NoOfTimes ]    
    */
  }
}

function buildLevelStructure(array, height){
  array.push([]);
  
  // For each level - height * 2 as we take into account the merge levels
  for (let i = 0; i < height*2; i++) {
    // sub array for each level
    array[array.length-1].push([]);

    // Calculates the number of sub arrays each level will have
    // when i > height, we are calculating for merge levels
    let power = i < height ? Math.pow(2, i+1) : Math.pow(2, height*2 - i -1);

    for (let j = 0; j < power; j++) {
      array[array.length-1]
          [array[array.length-1].length-1].push([]);
    }
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

function findAuxGreyOutCells(
    cellArray, array, start, length, callDepth, subArrayPos, height){
      
  if (cellArray.length === 0) {
    // Push placeholders
    buildLevelStructure(cellArray, height);
    
  } else {
    if (callDepth !== 0) {
      // Push previous state so other levels don't change
      cellArray.push(structuredClone(cellArray[cellArray.length -1]));

      let tmp = [];
      
      // Color the passed in array
      for (let i = start; i < start+length; i++) {
        tmp.push(array[i].key);
      }
      
      cellArray[cellArray.length -1][callDepth-1].splice(
          subArrayPos[callDepth], 1, tmp);

    } else {
      cellArray.push(cellArray[cellArray.length -1]);
    }
  }
}

function auxUngrey(aux, callDepth, height, divisionInsertPosition) {
  aux.push(structuredClone(aux[aux.length -1]));

  for (let i = callDepth-1; i < height*2 - 1 - callDepth; i++) {      
    // Semi hard coded - for array of length 8
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