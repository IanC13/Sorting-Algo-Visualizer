function mergeSortHelper(array, calculateDelay, setCurrentBars, setSpecial, setArray, setSorted, setSortedBars, setGreyOutBars) {
  console.log('mergeSortHelper');
  
  let delay = calculateDelay();

  let newArray = array.slice();
  let length = newArray.length;
  
  let allArrayStates = [];
  let greyOutBars = [];
  let animations = [];
  let currentSmallest = [];

  console.log(newArray);
  
  ({ allArrayStates, animations, currentSmallest } = mergeSort(newArray, 0, length-1, allArrayStates, animations, currentSmallest) );
  
  console.log(allArrayStates);
  console.log(allArrayStates.length);
  console.log(animations);
  console.log(animations.length);
  console.log(currentSmallest[0][1]);
  console.log(currentSmallest.length);


  for (let i = 0; i < allArrayStates.length; i++) {
    setTimeout(() => {
      setTimeout(() => {
        setCurrentBars(animations[i]);
      }, delay)
      
      setTimeout(() => {
        setSpecial(currentSmallest[i][0]);
      }, 2 * delay)
      
      setTimeout(() => {
        setArray(allArrayStates[i]);
        setSpecial(currentSmallest[i][1]);
      }, 3 * delay)
      
      if (i === allArrayStates.length -1) {
        setSorted(true);
      }

      setSpecial();
      
    }, i * (delay + 2 * delay + 3 * delay))
  }
}

function mergeSort(array, leftIdx, rightIdx, allArrayStates, animations, currentSmallest) {
  
  if (leftIdx < rightIdx) {
    // Find middle of array
    let midIdx = Math.floor((leftIdx + rightIdx) / 2);

    // grey out right array
    // let oldGrey = greyOutBars[greyOutBars.length-1]
    // oldGrey ? greyOutBars.push(oldGrey.slice()) : greyOutBars.push([]);
    // for (let i = midIdx + 1; i <= rightIdx; i++) {
    //   greyOutBars[greyOutBars.length-1].push(i);
    // }

    // Recursively call mergeSort on each part
    mergeSort(array, leftIdx, midIdx, allArrayStates, animations, currentSmallest);

    // grey left array and ungrey right array
    // let tmpArray = greyOutBars[greyOutBars.length -1];
    // for (let i = midIdx + 1; i <= rightIdx; i++) {
    //   tmpArray = tmpArray.filter(e => e !== i);
    // }
    // greyOutBars.push(tmpArray);

    // for (let i = leftIdx; i <= midIdx; i++) {
    //   greyOutBars[greyOutBars.length -1].push(i);
    // }

    mergeSort(array, midIdx + 1, rightIdx, allArrayStates, animations, currentSmallest);

    // At this point on every recursive call, we have 2 sorted arrays 
    // Merge them two together

    // ungrey both left and right
    // tmpArray = greyOutBars[greyOutBars.length -1];

    // for (let i = leftIdx; i <= rightIdx; i++) {
    //   tmpArray = tmpArray.filter(e => e !== i);
    // }
    // greyOutBars.push(tmpArray)

    merge(array, leftIdx, midIdx, rightIdx, allArrayStates, animations, currentSmallest);
  }

  // grey out single array
  // if (leftIdx >= rightIdx) {
  //   let oldGrey = greyOutBars[greyOutBars.length-1]
  //   greyOutBars.push(oldGrey.slice());
  //   greyOutBars[greyOutBars.length-1].push(leftIdx);
  // }
  return { allArrayStates, animations, currentSmallest };
} 

// array is initial array
function merge(array, leftIdx, midIdx, rightIdx, allArrayStates, animations, currentSmallest) {

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

  // Tracks how many times we've shifter
  let shiftCount = 0;

  while (l < lLength && r < rLength) {
    // highlight comparing bars
    // highlight insertion position (a)
    animations.push([leftIdx + l + shiftCount, midIdx + 1 + r]);

    if (leftArray[l] < rightArray[r]) {
      // Push a sub array of size 2 as we want to color the correct bar before and after swapping
      // before colored = currentSmallest[i][0], after swapping, colored = currentSmallest[i][1]      
      // when left is smaller, no position swap so same bar is colored
      currentSmallest.push([leftIdx + l + shiftCount, leftIdx + l + shiftCount]);

      array[a] = leftArray[l];
      l += 1;
    } else {

      // when right is smaller, there is a swap
      // so we color the right first, then the left
      currentSmallest.push([midIdx + 1 + r, leftIdx + l + shiftCount]);
      shiftCount += 1;

      // When the element on the right array is larger, we want to 
      // insert that element to position 'a' while preserving the elements
      // in the left array that is larger than this.
      // Therefore we shift the entire array instead of just swapping it: [2, 8, 5, 6] -> [2, 5, 8, 6]
      // Just swapping it works in algorithm as we have a copy of left and right
      let tmp = rightArray[r];

      for (let i = midIdx + 1 + r; i > a; i--) {
        array[i] = array[i-1];
      }
      array[a] = tmp;
      r += 1;
    }
    allArrayStates.push([...array]);
    
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
  allArrayStates.push([...array]);

  return { allArrayStates, animations, currentSmallest };
}

export default mergeSortHelper;


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