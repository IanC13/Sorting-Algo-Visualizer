function selectionSort(array) {
  const length = array.length;
  let newArray = array.slice();
  
  
  for (let i = 0; i < length; i++) {
    let minIdx = i;
    for (let j = i; j < length; j++) {
      if (newArray[j] < newArray[minIdx]) {
        minIdx = j;
      }
    }

    let tmp = newArray[minIdx];
    newArray[minIdx] = newArray[i];
    newArray[i] = tmp;
  }

  return newArray
}


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

