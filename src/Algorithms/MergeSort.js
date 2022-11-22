function mergeSortHelper(array, calculateDelay, setCurrentBars, setSpecial, setArray, setSorted, setSortedBars, setGreyOutBars) {
  console.log('mergeSortHelper');
  
  let delay = calculateDelay();

  let newArray = array.slice();
  let length = newArray.length;

  
  // let {allArrayStates, animations, currentSmallest, sortedBars}
  
  let allArrayStates = [];
  let greyOutBars = [];
  let animations = [];
  
  ({ allArrayStates, animations } = mergeSort(newArray, 0, length-1, allArrayStates, animations) );
  
  console.log(allArrayStates);

  for (let i = 0; i < allArrayStates.length; i++) {
    setTimeout(() => {
      setArray(allArrayStates[i]);
      // setGreyOutBars(greyOutBars[i]);
    }, i * delay)
  }
}

function mergeSort(array, leftIdx, rightIdx, allArrayStates, animations) {
  
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
    mergeSort(array, leftIdx, midIdx, allArrayStates, animations);

    // grey left array and ungrey right array
    // let tmpArray = greyOutBars[greyOutBars.length -1];
    // for (let i = midIdx + 1; i <= rightIdx; i++) {
    //   tmpArray = tmpArray.filter(e => e !== i);
    // }
    // greyOutBars.push(tmpArray);

    // for (let i = leftIdx; i <= midIdx; i++) {
    //   greyOutBars[greyOutBars.length -1].push(i);
    // }

    mergeSort(array, midIdx + 1, rightIdx, allArrayStates, animations);

    // At this point on every recursive call, we have 2 sorted arrays 
    // Merge them two together

    // ungrey both left and right
    // tmpArray = greyOutBars[greyOutBars.length -1];

    // for (let i = leftIdx; i <= rightIdx; i++) {
    //   tmpArray = tmpArray.filter(e => e !== i);
    // }
    // greyOutBars.push(tmpArray)

    merge(array, leftIdx, midIdx, rightIdx, allArrayStates, animations);
  }

  // grey out single array
  // if (leftIdx >= rightIdx) {
  //   let oldGrey = greyOutBars[greyOutBars.length-1]
  //   greyOutBars.push(oldGrey.slice());
  //   greyOutBars[greyOutBars.length-1].push(leftIdx);
  // }
  return { allArrayStates, animations };
} 

// array is initial array
function merge(array, leftIdx, midIdx, rightIdx, allArrayStates, animations) {

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

  console.log(leftArray);
  console.log(rightArray);

  // Looping index
  let l = 0; // left array
  let r = 0; // right array
  let a = leftIdx; // merged array

  while (l < lLength && r < rLength) {
    // highlight comparing bars
    animations.push([leftIdx + l, rightIdx + r]);
    // highlight insertion position (a)
    if (leftArray[l] < rightArray[r]) {
      array[a] = leftArray[l];
      l += 1;
    } else {
      // When the element on the right array is larger, we want to 
      // insert that element to position a while preserving the elements
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
    // console.log('here2',array);
    allArrayStates.push([...array]);
    
    a += 1;
  }

  // At this point, all values from either the left or the right array is 
  // copied into array. As we know left and right arrays themselves are
  // sorted, we just add the rest of the not copied array to the end
  while (l < lLength) {
    // highlight insertion bar (l)
    animations.push([leftIdx + l]);
    // highlight insertion position (a)
    array[a] = leftArray[l];
    a += 1;
    l += 1
  }

  while (r < rLength) {
    // highlight insertion bar (r)
    animations.push([rightIdx + r]);
    // highlight insertion position (a)
    array[a] = rightArray[r];
    a += 1;
    r += 1;
  }
  // console.log('here3',array);
  allArrayStates.push([...array]);

  return { allArrayStates, animations };
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