function bubbleSort(array) {
  const length = array.length;
  let newArray = array.slice();

  // animations array is a 2d array => [[0,1], [1,2], [2,3]...]
  // holds the index of bars that are compared.
  // length of this = total comparisons
  let animations = [];

  // Every state of the array after each pass
  let allArrayStates = [];

  // holds index of the larger element for each comparison
  let largerArray = [];

  for (let i = 0; i < length; i++) {
    let swap = false;

    for (let j = 0; j < length - 1 - i; j++) {
      if (newArray[j] > newArray[j+1]) {
        largerArray.push([j, j+1]);

        let temp = newArray[j];
        newArray[j] = newArray[j+1];

        newArray[j+1] = temp;
        

        swap = true;
      } else {
        largerArray.push([j+1, j+1]);
      }


      animations.push([j, j+1]);
      allArrayStates.push([...newArray]);
    }

    if (swap === false) {
      break;
    }
  }

  return { allArrayStates, animations, largerArray };
}


export default bubbleSort;