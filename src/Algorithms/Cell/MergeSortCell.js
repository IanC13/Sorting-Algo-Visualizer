function mergeSortHelperCell(array) {
  let newArray = array.slice();
  let length = newArray.length;

  let allArrayStates = [];
  let animations = [];
  let sortedElements = [];
  let auxillaryArrays = [];


  // Sub arrays for each level of divide and conquer and merge
  let height = Math.log2(length);

  let callDepth = -1;
  let divisionInsertPosition = [0, 0, 0];

  ({allArrayStates, animations, sortedElements, auxillaryArrays} = 
        mergeSort(
            newArray,
            /* start Index */ 0, 
            /* end Index */ length-1, 
            allArrayStates,
            animations,
            sortedElements,
            auxillaryArrays,
            callDepth,
            height,
            divisionInsertPosition            
        )
  );

  return { allArrayStates, animations, sortedElements, auxillaryArrays };
}

function mergeSort(
    array, 
    leftIdx, 
    rightIdx, 
    allArrayStates, 
    animations, 
    sortedElements, 
    auxillaryArrays,
    callDepth,
    height,
    divisionInsertPosition ) {

  console.log('mergeSort');

  callDepth += 1;

  if (auxillaryArrays.length !== 0) {
    auxillaryArrays.push(structuredClone(auxillaryArrays[auxillaryArrays.length -1]));
  } else {
    auxillaryArrays.push([]);
    console.log('here')
    for (let i = 0; i < height*2; i++) {
      auxillaryArrays[auxillaryArrays.length-1].push([]);

      let power = i < height ? Math.pow(2, i+1) : Math.pow(2, height*2 - i -1);

      for (let j = 0; j < power; j++) {
        auxillaryArrays[auxillaryArrays.length-1]
            [auxillaryArrays[auxillaryArrays.length-1].length-1].push([]);
      }
    }
  }

  if (leftIdx < rightIdx) {
    // Find middle of array
    let midIdx = Math.floor((leftIdx + rightIdx) / 2);

    // Recursively divided arrays
    auxillaryArrays[auxillaryArrays.length -1][callDepth].splice(
        divisionInsertPosition[callDepth], 1, array.slice(leftIdx, midIdx+1));
    
    divisionInsertPosition[callDepth] += 1;

    // Recursively call mergeSort on each part
    mergeSort(
        array, 
        leftIdx, 
        midIdx, 
        allArrayStates, 
        animations, 
        sortedElements, 
        auxillaryArrays,
        callDepth,
        height,
        divisionInsertPosition 
    );
    
    auxillaryArrays[auxillaryArrays.length -1][callDepth].splice(
        divisionInsertPosition[callDepth], 1, array.slice(midIdx+1, rightIdx+1));
    
    divisionInsertPosition[callDepth] += 1;

    mergeSort(
        array, 
        midIdx + 1, 
        rightIdx, 
        allArrayStates, 
        animations, 
        sortedElements, 
        auxillaryArrays,
        callDepth,
        height,
        divisionInsertPosition 
    );

    // At this point on every recursive call, we have 2 sorted arrays 
    // Merge them two together

    merge(
        array, 
        leftIdx, 
        midIdx, 
        rightIdx, 
        allArrayStates, 
        animations, 
        sortedElements, 
        auxillaryArrays
    );
  }

  return {allArrayStates, animations, sortedElements, auxillaryArrays}
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
    auxillaryArrays) {
  
  console.log('merge');
  
  // Lengths of left and right array
  let lLength = midIdx - leftIdx + 1;
  let rLength = rightIdx - midIdx;

  // Temp l and r array
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

    if (leftArray[l] < rightArray[r]) {         
      array[a] = leftArray[l];
      l += 1;
    } 


    while (l < lLength) {
      array[a] = leftArray[l];
      a += 1;
      l += 1
    }

    while (r < rLength) {
      array[a] = rightArray[r];
      a += 1;
      r += 1;
    }
    
    
    return {allArrayStates, animations, sortedElements, auxillaryArrays};
  }
}

export default mergeSortHelperCell;