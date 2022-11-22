function mergeSort(array) {
  let length = array.length;
  if (length > 1) {
    // Divide array up into left and right parts
    let midIdx = Math.floor(length / 2);
    let leftArray = array.slice(0, midIdx);
    let rightArray = array.slice(midIdx);

    // Recursively call mergeSort on each part
    mergeSort(leftArray);
    mergeSort(rightArray);

    // At this point on every recursive call, we have 2 sorted arrays 
    // Merge them two together
    let leftIdx = 0;
    let rightIdx = 0;
    let arrayIdx = 0;

    while (leftIdx < leftArray.length && rightIdx < rightArray.length) {
      if (leftArray[leftIdx] < rightArray[rightIdx]) {
        array[arrayIdx] = leftArray[leftIdx];
        leftIdx += 1;
      } else {
        array[arrayIdx] = rightArray[rightIdx];
        rightIdx += 1;
      }
      
      arrayIdx += 1;
    }

    // At this point, all values from either the left or the right array is 
    // copied into array. As we know left and right arrays themselves are
    // sorted, we just add the rest of the not copied array to the end
    while (leftIdx < leftArray.length) {
      array[arrayIdx] = leftArray[leftIdx];
      arrayIdx += 1;
      leftIdx += 1
    }

    while (rightIdx < rightArray.length) {
      array[arrayIdx] = rightArray[rightIdx];
      arrayIdx += 1;
      rightIdx += 1;
    }
  }
  return array;
}  


// TESTING ALGORITHM
// for (let i = 0; i < 1000; i++) {
//   let a = [];
//   for (let i = 0; i < 1000; i++) {
//     a.push(Math.floor(Math.random() * 100));
//   }

//   let sel = mergeSort(a);
//   let js = a.slice().sort((a, b) => a-b);
//   let result = test(sel, js);
//   if (result === false) {
//     console.log('Algorithm Incorrect');
//     break
//   }
// }
// console.log('Algorithm Correct');

// function test(a, b) {
//   if (a.length !== b.length) return false;
//   for (let i = 0; i < a.length; i++ ){
//     if (a[i] !== b[i]) return false;
//   }
//   return true;
// }