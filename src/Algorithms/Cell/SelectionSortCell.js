function selectionSortHelperCell(array) {

  let {allArrayStates, animations, sortedElements} = selectionSortCell(array);

  return { allArrayStates, animations, sortedElements };
}

function selectionSortCell(array) {
  const length = array.length;
  let newArray = array.slice();
  
  let animations = [];

  let allArrayStates = [];

  // let currentSmallest = [];

  let sortedElements = [[]];

  for (let i = 0; i < length; i++) {
    let minIdx = i;

    for (let j = i+1; j < length; j++) {
      
      // Animation states
      animations.push([newArray[minIdx].key, newArray[j].key]);
      allArrayStates.push([...newArray]);
      // Don't push if it is last idx in this loop - push below
      if (j !== length - 1) {
        sortedElements.push(sortedElements[sortedElements.length - 1]);
      }

      if (newArray[j].value < newArray[minIdx].value) {
        minIdx = j;
      }
      // currentSmallest.push(minIdx);
      
      // if (j !== length - 1) {
      //   // false for non swapping state change
      //   allArrayStates.push([...newArray, false]);

      //   sortedElements.push(sortedElements[sortedElements.length - 1]);
      // }
    }

    let tmp = newArray[minIdx];
    newArray[minIdx] = newArray[i];
    newArray[i] = tmp;
    
    // Animation States
    allArrayStates.push([...newArray]);
    animations.push([newArray[i].key]);
    sortedElements.push(sortedElements[sortedElements.length - 1]);

    // point where one more element is sorted
    sortedElements.push([]);
    for (let k = 0; k < i+1; k++) {
      sortedElements[sortedElements.length - 1].push(
          newArray[k].key);
    }
  }

  return { allArrayStates, animations, sortedElements }
}

export default selectionSortHelperCell;