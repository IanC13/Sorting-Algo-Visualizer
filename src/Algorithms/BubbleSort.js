function bubbleSortHelper(array, calculateDelay, setCurrentBars, setSpecial, setArray, setSorted) {
  let delay = calculateDelay();

  let {allArrayStates, animations, largerArray} = bubbleSort(array);

  const length = animations.length;

  // Delay from 2 same color highlighted bar to larger one highlighted with a different color
  let largerColorDelay = delay;
  // Delay from 2 differently highlighted bar to swapping
  let swapDelay = largerColorDelay + delay;

  for (let i = 0; i < length; i++) {
    setTimeout(() => {
      // Current 2 bars we are comparing. state change so re renders which trigger 
      // the color change
      setCurrentBars(animations[i]);
      
      // highlight the 2 comparing bars for some time before coloring the larger one 
      setTimeout(() => {
        // larger of the two, re render with a different color
        setSpecial(largerArray[i][0]);
      }, largerColorDelay);

      // wait then swap
      setTimeout(() => {
        // Triggers re render, display swapped position
        setArray(allArrayStates[i]);
        setSpecial(largerArray[i][1]);
      }, swapDelay);

      // reset swapped bars to be same color
      setSpecial();
      
      // Check if it is sorted
      if (i === length - 1){
        // re render to sorted color
        setSorted(true);
      }

    }, i * (delay + (largerColorDelay + swapDelay)));
    /*
    i * DELAY because setTimeout is non-blocking i.e. entire for loop will 
    run during wait time. for loop runs pretty much instantly so everything
    in setTimeout only runs once as DELAY > for loop

    i * DELAY solves this by creating a timer every pass as using 'let', 
    a unique i is declared for each iteration and the timer 
    is old time + DELAY (as i is 1 bigger than i-1)

    USE WITH CAUTION. A new timer is created on every pass which means
    length number of timers are created, a lot more memory usage.
    */
  }
  setCurrentBars([]);
  setSpecial([]);
}

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


export default bubbleSortHelper;