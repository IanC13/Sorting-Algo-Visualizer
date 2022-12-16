function mergeSortHelperBar(
    array, 
    calculateDelay, 
    setCurrentBars, 
    setSpecial, 
    setArray, 
    setSorted, 
    setSortedBars, 
    setGreyOutBars) {

  let delay = calculateDelay();

  let newArray = array.slice();
  let length = newArray.length;

  // Used to determine when to highlight bars as sorted
  // Last call to function merge(...), sorts the array in final position
  // at this call, callDepth === 1
  let callDepth = 0;
  
  let allArrayStates = [];
  let animations = [];
  let currentSmallest = [];
  let sortedBars = [[]];
  let greyOutBars = [];

  ({allArrayStates, animations, currentSmallest, sortedBars, greyOutBars} = 
        mergeSort(
            newArray, 
            /* start Index */ 0, 
            /* end Index */ length-1, 
            allArrayStates, 
            animations, 
            currentSmallest, 
            sortedBars, 
            callDepth,
            greyOutBars
        )
  );
  
  let startingAnimation = [];
  let lengthLog2 = Math.floor(Math.log2(array.length));
  let end = Math.floor(array.length/2);

  for (let i = 1; i < lengthLog2 + 1; i++) {
    startingAnimation.push([]);

    for (let j = 0; j < end; j++) {
      startingAnimation[startingAnimation.length -1].push(j);
    }
    end = Math.floor(end/2);
  }

  let startingAnimationLength = startingAnimation.length;
  let startingAnimationDelay = 500;

  for (let i = 0; i < startingAnimationLength; i++) {
    setTimeout(() => {
      setGreyOutBars(startingAnimation[i]);
    }, i * startingAnimationDelay);
  }
  
  for (let i = 0; i < allArrayStates.length; i++) {
    setTimeout(() => {
      setGreyOutBars(greyOutBars[i]);

      setCurrentBars(animations[i]);

      // color the smaller of the two
      setTimeout(() => {
        // Don't color if bars are moving into final position
        if (allArrayStates[i][allArrayStates[i].length-1] === false) {
          setSpecial(currentSmallest[i][0]);
        }
      }, 2 * delay)
      
      // Swap bars
      setTimeout(() => {
        setArray(allArrayStates[i].slice(0, -1));
        
        if (allArrayStates[i][allArrayStates[i].length-1] === true) {
          setSortedBars(sortedBars[i]);
        } else {
          // === false
          /// From above, if === false, it will color. do the same here
          setSpecial(currentSmallest[i][1]);
        }
       
      }, 3 * delay)
      
      if (i === allArrayStates.length -1) {
        setSorted(true);
      }

      //setSpecial();
      
    }, i * (delay + 2 * delay) + 
        startingAnimationLength * startingAnimationDelay)
  }
}

function mergeSort(
    array, 
    leftIdx, 
    rightIdx, 
    allArrayStates, 
    animations, 
    currentSmallest, 
    sortedBars, 
    callDepth,
    greyOutBars) {
      
  callDepth += 1;
  
  if (leftIdx < rightIdx) {
    // Find middle of array
    let midIdx = Math.floor((leftIdx + rightIdx) / 2);

    // Recursively call mergeSort on each part
    mergeSort(
        array, 
        leftIdx, 
        midIdx, 
        allArrayStates, 
        animations, 
        currentSmallest, 
        sortedBars, 
        callDepth,
        greyOutBars
    );

    mergeSort(
        array, 
        midIdx + 1, 
        rightIdx, 
        allArrayStates, 
        animations, 
        currentSmallest, 
        sortedBars, 
        callDepth,
        greyOutBars
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
        currentSmallest, 
        sortedBars, 
        callDepth,
        greyOutBars
    );
  }
  
  return {allArrayStates, animations, currentSmallest, sortedBars, greyOutBars};
} 
  
// array is initial array
function merge(
    array, 
    leftIdx, 
    midIdx, 
    rightIdx, 
    allArrayStates, 
    animations, 
    currentSmallest, 
    sortedBars, 
    callDepth,
    greyOutBars) {
  
  greyOutBars.push([]);
  // push indices of the left array
  for (let i = leftIdx; i < rightIdx+1; i++) {
    greyOutBars[greyOutBars.length-1].push(i);
  }
  

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

  // Tracks how many times we've shifted
  let shiftCount = 0;

  while (l < lLength && r < rLength) {
    // highlight comparing bars
    // highlight insertion position (a)
    animations.push([leftIdx + l + shiftCount, midIdx + 1 + r]);

    if (leftArray[l] <= rightArray[r]) {
      /*
      * Push a sub array of size 2 as we want to color the correct bar before 
      * and after swapping before colored = currentSmallest[i][0], after 
      * swapping, colored = currentSmallest[i][1] when left is smaller, no 
      * position swap so same bar is colored
      */
      currentSmallest.push(
          [leftIdx + l + shiftCount, leftIdx + l + shiftCount]);
          
      array[a] = leftArray[l];
      l += 1;
    } else {
      // when right is smaller, there is a swap
      // so we color the right first, then the left
      currentSmallest.push([midIdx + 1 + r, leftIdx + l + shiftCount]);
      shiftCount += 1;
      /*
      * When the element on the right array is larger, we want to 
      * insert that element to position 'a' while preserving the elements
      * in the left array that is larger than this.
      * Therefore we shift the entire array instead of just swapping it: 
      * [2, 8, 5, 6] -> [2, 5, 8, 6]
      * Just swapping it works in algorithm as we have a copy of left and 
      * right
      */
      let tmp = rightArray[r];

      for (let i = midIdx + 1 + r; i > a; i--) {
        array[i] = array[i-1];
      }
      array[a] = tmp;
      r += 1;
    }
    
    // Determine if it is final merge - bars are then sorted into final position
    if (callDepth === 1) {
      allArrayStates.push([...array, true]);
      sortedBars.push([]);
      for (let i = 0; i <= a; i++) {
        sortedBars[sortedBars.length - 1].push(i)
      }
    } else {
      allArrayStates.push([...array, false]);
      sortedBars.push(sortedBars[sortedBars.length - 1]);
    }

    greyOutBars.push(greyOutBars[greyOutBars.length -1]);
    
    a += 1;
  }

  // At this point, all values from either the left or the right array is 
  // copied into array. As we know left and right arrays themselves are
  // sorted, we just add the rest of the not copied array to the end
  animations.push([]);
  currentSmallest.push([-1, -1]);
  while (l < lLength) {
    animations[animations.length -1].push(leftIdx + l + shiftCount);
    // highlight insertion bar (l)
    // highlight insertion position (a)
    array[a] = leftArray[l];
    a += 1;
    l += 1
  }

  while (r < rLength) {
    animations[animations.length -1].push(midIdx + 1 + r);
    // highlight insertion bar (r)
    // highlight insertion position (a)
    array[a] = rightArray[r];
    a += 1;
    r += 1;
  }
  
  if (callDepth === 1) {
    allArrayStates.push([...array, true]);
    sortedBars.push([]);
    for (let i = 0; i <= a; i++) {
      sortedBars[sortedBars.length - 1].push(i)
    }
  } else {
    allArrayStates.push([...array, false]);
    sortedBars.push(sortedBars[sortedBars.length - 1]);
  }
  return {allArrayStates, animations, currentSmallest, sortedBars, greyOutBars};
}

export default mergeSortHelperBar;

// TESTING ALGORITHM
// let flag = true;
// for (let i = 0; i < 1000; i++) {
//   let a = [];
//   for (let i = 0; i < 1000; i++) {
//     a.push(Math.floor(Math.random() * 100));
//   }

//   let sel = mergeSort(a, 0, a.length-1);
//   let js = a.slice().sort((a, b) => a-b);
//   let result = test(sel, js);
//   if (result === false) {
//     console.log('Algorithm Incorrect');
//     flag = false
//     break
//   }
// }

// if (flag === true) {
//   console.log('Algorithm Correct');
// }

// function test(a, b) {
//   if (a.length !== b.length) return false;
//   for (let i = 0; i < a.length; i++ ){
//     if (a[i] !== b[i]) return false;
//   }
//   return true;
// }