function bubbleSortHelperCell(array) {
  let {allArrayStates, animations, sortedElements} = bubbleSortCell(array);

  return { allArrayStates, animations, sortedElements };
}


function bubbleSortCell(array) {
  const length = array.length;
  let newArray = array.slice();

  let animations = [];

  let allArrayStates = [];

  // let largerArray = [];

  let sortedElements = [[]];

  for (let i = 0; i < length; i++) {
    let swap = false;

    for (let j = 0; j < length - 1 - i; j++) {

      // Animation States
      animations.push([newArray[j].key, newArray[j+1].key]);
      allArrayStates.push([...newArray]);
      sortedElements.push(sortedElements[sortedElements.length - 1]);

      if (newArray[j].value > newArray[j+1].value) {
        // largerArray.push([j, j+1]);

        let temp = newArray[j];
        newArray[j] = newArray[j+1];
        newArray[j+1] = temp;
      
        swap = true;

        // Animation States
        animations.push([newArray[j].key, newArray[j+1].key]);
        allArrayStates.push([...newArray]);
        if (j !== length - 1 - i - 1) {
          sortedElements.push(sortedElements[sortedElements.length - 1]);
        }
      } else {
        // largerArray.push([j+1, j+1]);
      }
    }
    
    // At this point one more element is sorted
    sortedElements.push([]);
    for (let k = 0; k < i+1; k++) {
      sortedElements[sortedElements.length - 1].push(
          newArray[length - 1 - k].key);
    }

    if (swap === false) {
      break;
    }
  }

  animations.push(animations[animations.length - 1]);
  allArrayStates.push(allArrayStates[allArrayStates.length - 1]);

  return { allArrayStates, animations, sortedElements };
}

export default bubbleSortHelperCell;