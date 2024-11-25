
// function findElement(arr, func) {
//   let num = 0;
  
//   return arr.find(e => func(e));
// }

// let x = findElement([1, 2, 3, 4], num => num % 2 === 0);
// console.log(x);




// let x = true
// console.log(typeof typeof x);

// Boo who
// Check if a value is classified as a boolean primitive. Return true or false.

// Boolean primitives are true and false.
// function booWho(bool) {
//     return typeof bool === "boolean" ? true : false;
//   }
  
//   console.log(booWho(true), booWho(1));

// Title Case a Sentence
// Return the provided string with the first letter of each word capitalized. Make sure the rest of the word is in lower case.

// For the purpose of this exercise, you should also capitalize connecting words like the and of.
// function titleCase(str) {
//     let result = str[0].toUpperCase();
//     for (let x = 1; x < str.length; x++) {
//         if (str[x-1] === ' ') {
//             result += str[x].toUpperCase();
//         }else{
//             result += str[x].toLowerCase();
//         }
//     }
//     return result;
//   }
//   console.log(titleCase("I'm a little tea pot"));

/**
 * Inserts the elements of arr1 into arr2 at index n.
 * @param {array} arr1 the array to insert into arr2
 * @param {array} arr2 the array to insert arr1 into
 * @param {number} n the index at which to insert arr1
 * @returns {array} the modified array
 */
function frankenSplice(arr1, arr2, n) {
    console.log(arr2);
    let localArr = arr2.slice(); //creates a shallow copy
    const newA = Array.of(...arr2); //creates a deep copy
    localArr.splice(n, 0, ...arr1);
    return localArr;
  }

console.log(frankenSplice([1, 2, 3], [4, 5, 6], 1));