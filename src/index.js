const fs = require('fs');
const { getRandomWordSync, getRandomWord } = require('word-maker');

console.log('It works!');

// YOUR CODE HERE

let curWord = '';
// TASK 1 BELOW
// for (let i = 1; i <= 100; i += 1) {
//   try {
//     curWord = getRandomWordSync({ withErrors: true });
//     console.log(`${i}: ${curWord}`);
//   } catch (err) {
//     console.log("It shouldn't break anything!");
//   }
// }

// TASK 2 BELOW
// for (let i = 1; i <= 100; i += 1) {
//   try {
//     curWord = getRandomWordSync({ withErrors: true });
//     if (i % 5 === 0 && i && i % 3 === 0) console.log('FizzBuzz');
//     else if (i % 5 === 0) console.log('Buzz');
//     else if (i % 3 === 0) console.log('Fizz');
//     else {
//       console.log(`${i}: ${curWord}`);
//     }
//   } catch (err) {
//     console.log("It shouldn't break anything!");
//   }
// }

// TASK 1, ASYNC
// instantiate promise object to chain on following promises, in numeric order

// let promiseChain = Promise.resolve();
// for (let i = 1; i <= 100; i += 1) {
//   promiseChain = promiseChain
//     .then(() => getRandomWord({ withErrors: true }))
//     .then(word => console.log(`${i}: ${word}`))
//     .catch(err => {
//       console.log("It shouldn't break anything!");
//     });
// }

// TASK 2, ASYNC

let promiseChain2 = Promise.resolve();
for (let i = 1; i <= 100; i += 1) {
  promiseChain2 = promiseChain2
    .then(() => getRandomWord({ withErrors: true }))
    .then(word => {
      let phraseToWrite2 = '';
      if (i % 5 === 0 && i && i % 3 === 0) {
        console.log('FizzBuzz');
        phraseToWrite2 = 'FizzBuzz';
      } else if (i % 5 === 0) {
        console.log('Buzz');
        phraseToWrite2 = 'Buzz';
      } else if (i % 3 === 0) {
        console.log('Fizz');
        phraseToWrite2 = 'Fizz';
      } else {
        console.log(`${i}: ${word}`);
        phraseToWrite2 = `${i}: ${word}`;
      }
      fs.appendFile('test2.txt', `${phraseToWrite2}\n`, writeErr => {
        if (writeErr) throw writeErr;
      });
    })
    .catch(err => {
      console.log("It shouldn't break anything!");
      fs.appendFile('test2.txt', `It shouldn't break anything!\n`, writeErr => {
        if (writeErr) throw writeErr;
      });
    });
}
