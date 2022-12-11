function selectionSortHelperBar(
    array, 
    calculateDelay, 
    setCurrentBars, 
    setSpecial, 
    setArray, 
    setSorted, 
    setSortedBars) {
  let delay = calculateDelay();

  let { allArrayStates, 
        animations, 
        currentSmallest, 
        sortedBars
      } = selectionSortBar(array);

  let animationsLength = animations.length;

  let smallerDelay = delay;
  let swapDelay = smallerDelay + delay;

  for (let i = 0; i < animationsLength; i++) {
    setTimeout(() => {
      setCurrentBars(animations[i]);
      
      setTimeout(() => {
        setSpecial(currentSmallest[i])
      }, smallerDelay)
      
      setTimeout(() => {
        // Not swapped yet
        if (allArrayStates[i][allArrayStates[i].length-1] === false) {
          setArray(allArrayStates[i].slice(0, -1))
        } else {
          // Swapped - one more element in place
          setCurrentBars([])
          setSpecial()
          setArray(allArrayStates[i].slice(0, -1))
        }
      }, swapDelay)
      
      setSortedBars(sortedBars[i]);

      // Check if it is sorted
      if (i === animationsLength - 1){
        // re render to sorted color
        setSorted(true);
      }
    }, i * (delay + smallerDelay + swapDelay))
  }
}

function selectionSortBar(array) {
  const length = array.length;
  let newArray = array.slice();
  
  // holds the index of bars that are compared.
  let animations = [];

  // Every state of the array after each pass
  let allArrayStates = [];

  let currentSmallest = [];

  // See BubbleSort.js for implementation detail
  let sortedBars = [[]];

  for (let i = 0; i < length; i++) {
    let minIdx = i;

    for (let j = i+1; j < length; j++) {
      animations.push([minIdx, j]);
      if (newArray[j] < newArray[minIdx]) {
        minIdx = j;
      }
      currentSmallest.push(minIdx);
      
      if (j !== length - 1) {
        // false for non swapping state change
        allArrayStates.push([...newArray, false]);

        sortedBars.push(sortedBars[sortedBars.length - 1]);
      }
    }

    let tmp = newArray[minIdx];
    newArray[minIdx] = newArray[i];
    newArray[i] = tmp;

    // state change with a swap
    allArrayStates.push([...newArray, true]);

    // point where one more bar is sorted
    sortedBars.push([]);
    for (let k = 0; k < i+1; k++) {
      sortedBars[sortedBars.length - 1].push(k);
    }
  }

  return { allArrayStates, animations, currentSmallest, sortedBars }
}

export default selectionSortHelperBar;


// TESTING ALGORITHM
// for (let i = 0; i < 1000; i++) {
//   let a = [];
//   for (let i = 0; i < 1000; i++) {
//     a.push(Math.floor(Math.random() * 100));
//   }

//   let sel = selectionSort(a);
//   let js = a.slice().sort((a, b) => a-b);
//   let result = test(sel, js);
//   if (result === false) {
//     console.log('you fucked up');
//     break
//   }
// }
// console.log('done');

// function test(a, b) {
//   if (a.length !== b.length) return false;
//   for (let i = 0; i < a.length; i++ ){
//     if (a[i] !== b[i]) return false;
//   }
//   return true;
// }

