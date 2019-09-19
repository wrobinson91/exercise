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

// TASK 1, ASYNC -- write to file

// clears out file before another run through
fs.writeFileSync('testAsync.txt', '');

// instantiate promise object to chain on following promises, in numeric order
let promiseChain = Promise.resolve();
let bodyToSend = '';

for (let i = 1; i <= 100; i += 1) {
  promiseChain = promiseChain
    .then(() => getRandomWord({ withErrors: true }))
    .then(word => {
      console.log(`${i}: ${word}`);
      bodyToSend += `${i}: ${word}\n`;
      fs.appendFile('testAsync.txt', `${i}: ${word}\n`, writeErr => {
        if (writeErr) throw writeErr;
        if (i === 100) {
          // do post req to backend -- commented out to avoid error
          // fetch('/api', {
          //   method: 'POST',
          //   body: JSON.stringify({ text: bodyToSend }),
          //   headers: {
          //     'Content-Type': 'application/json'
          //   }
          // })
          //   .then(res => res.json())
          //   .then(data => console.log('sent to api'))
          //   .catch(e => console.log('Error sending to backend.'));
        }
      });
    })
    .catch(err => {
      console.log("It shouldn't break anything!");
      bodyToSend += `It shouldn't break anything!\n`;
      fs.appendFile('testAsync.txt', `It shouldn't break anything!\n`, writeErr => {
        if (writeErr) throw writeErr;
      });
      if (i === 100) {
        // do post req to backend -- commented out to avoid error
        // fetch('/api', {
        //   method: 'POST',
        //   body: JSON.stringify({ text: bodyToSend }),
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        // })
        //   .then(res => res.json())
        //   .then(data => console.log('sent to api'))
        //   .catch(e => console.log('Error sending to backend.'));
      }
    });
}

// TASK 2, ASYNC -- write to file

// clears out file before another run through
fs.writeFileSync('testAsync2.txt', '');

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
      fs.appendFile('testAsync2.txt', `${phraseToWrite2}\n`, writeErr => {
        if (writeErr) throw writeErr;
      });
    })
    .catch(err => {
      console.log("It shouldn't break anything!");
      fs.appendFile('testAsync2.txt', `It shouldn't break anything!\n`, writeErr => {
        if (writeErr) throw writeErr;
      });
    });
}
