

function bubbleSort(array, setCurrentBars) {
  const length = array.length;
  let newArray = array.slice();

  for (let i = 0; i < length; i++) {
    let swap = false;

    for (let j = 0; j < length - 1 - i; j++) {
      if (newArray[j] > newArray[j+1]) {
        let temp = newArray[j];
        newArray[j] = newArray[j+1];

        newArray[j+1] = temp;

        swap = true;
      }        
    }

    if (swap === false) {
      break;
    }
  }

  return newArray;
}


export default bubbleSort;