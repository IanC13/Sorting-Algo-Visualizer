function insertionSortHelperCell(array) {
  // animations are highlighted cells
  let {allArrayStates, animations, sortedElements} = insertionSortCell(array);

  return { allArrayStates, animations, sortedElements };
}

function insertionSortCell(array) {
  const length = array.length;
  let newArray = array.slice();
  
  let animations = [];

  let allArrayStates = [];

  let sortedElements = [[]];

  for (let i = 1; i < length; i++) {
    let j = i - 1;

    
    while (j >= 0) {
      // If statement instead of just include condition in while statement so 
      // that comparisons can be highlighted even if condition untrue
      animations.push([newArray[j+1].key, newArray[j].key]);
      allArrayStates.push([...newArray]);
      // Don't push if it is last idx in this loop - push below
      if (j !== 0) {
        sortedElements.push(sortedElements[sortedElements.length - 1]);
      }

      if (newArray[j+1].value < newArray[j].value) {

        let tmp = newArray[j + 1];
        newArray[j + 1] = newArray[j];
        newArray[j] = tmp;

        animations.push([newArray[j+1].key, newArray[j].key]);
        allArrayStates.push([...newArray]);
        if (j !== 0) {
          sortedElements.push(sortedElements[sortedElements.length - 1]);
        }

        j -= 1;
      } else {
        break;
      }
    }

    // point where one more element is sorted
    sortedElements.push([]);
    for (let k = 0; k < i+1; k++) {
      sortedElements[sortedElements.length - 1].push(
          newArray[k].key);
    }
  }

  return { allArrayStates, animations, sortedElements }
}

export default insertionSortHelperCell;