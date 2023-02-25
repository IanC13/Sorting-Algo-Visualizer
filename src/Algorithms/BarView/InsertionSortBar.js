function insertionSortHelperBar(
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
      } = insertionSortBar(array);

  let length = animations.length;

  let smallerDelay = delay;
  let swapDelay = smallerDelay + delay;

  for (let i = 0; i < length; i++) {
    setTimeout(() => {
      // Bars under comparison
      setCurrentBars(animations[i]);
      
      // Smaller bar
      setTimeout(() => {
        setSpecial(currentSmallest[i][0])
      }, smallerDelay)
      
      // Wait then swap
      setTimeout(() => {
        setArray(allArrayStates[i]);
        setSpecial(currentSmallest[i][1]);
      }, swapDelay)
      
      setSpecial();
      setSortedBars(sortedBars[i]);

      // Check if it is sorted
      if (i === length - 1){
        // re render to sorted color
        setSorted(true);
      }
    }, i * (delay + smallerDelay + swapDelay))
  }
}

function insertionSortBar(array) {
  const length = array.length;
  let newArray = array.slice();
  
  // holds the index of bars that are compared.
  let animations = [];

  // Every state of the array after each pass
  let allArrayStates = [];

  let currentSmallest = [];

  // See BubbleSort.js for implementation detail
  let sortedBars = [[]];

  //Insertion Sort
  for (let i = 1; i < length; i++) {
    let j = i - 1;

    while (j >= 0) {
      // Highlight the two comparing bars
      currentSmallest.push([]);
      animations.push([j+1, j]);
      allArrayStates.push([...newArray]);
      if (j !== 0) {
        sortedBars.push(sortedBars[sortedBars.length - 1]);
      }

      if (newArray[j+1] < newArray[j]) {

        // Highlight the smaller bar
        currentSmallest.push([j+1, j]);
          
        let tmp = newArray[j + 1];
        newArray[j + 1] = newArray[j];
        newArray[j] = tmp;
        
        animations.push([j+1, j]);
        allArrayStates.push([...newArray]);
        if (j !== 0) {
          sortedBars.push(sortedBars[sortedBars.length - 1]);
        }

        j -= 1;
      } else {
        // Highlight the smaller bar
        currentSmallest.push([j, j]);
        animations.push([j+1, j]);
        allArrayStates.push([...newArray]);
        if (j !== 0) {
          sortedBars.push(sortedBars[sortedBars.length - 1]);
        }
        
        break;
      }
    }
    // point where one more element is sorted
    sortedBars.push([]);
    for (let k = 0; k < i+1; k++) {
      sortedBars[sortedBars.length - 1].push(k);
    }
  }

  return { allArrayStates, animations, currentSmallest, sortedBars }
}

export default insertionSortHelperBar;