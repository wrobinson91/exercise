const fs = require('fs');
const { getRandomWordSync, getRandomWord } = require('word-maker');

console.log('It works!');

// YOUR CODE HERE

// note: there are sync and async versions of both methods, both with random errors being thrown

// TASK 1 BELOW
let curWord = '';

// MODIFIED TO CATCH ERRORS FOR SYNC METHOD

// for (let i = 1; i <= 100; i += 1) {
//   // Try to receive a word after invoking getRandomWordSync with errors on
//   try {
//     curWord = getRandomWordSync({ withErrors: true });
//     // if successful, print out current word
//     console.log(`${i}: ${curWord}`);
//   } catch (err) {
//     // if unsuccessful, print out provided error message
//     console.log("It shouldn't break anything!");
//   }
// }

// TASK 2 BELOW
// MODIFIED TO CATCH ERRORSFOR SYNC METHOD

// for (let i = 1; i <= 100; i += 1) {
//   // Try to receive a word after invoking getRandomWordSync with errors on
//   try {
//     // if successful it will:
//     // a) print our FizzBuzz if num is divisible by 3 and 5
//     curWord = getRandomWordSync({ withErrors: true });
//     if (i % 5 === 0 && i && i % 3 === 0) console.log('FizzBuzz');
//     else if (i % 5 === 0) console.log('Buzz');
//     //  b) print out Buzz if it is only divis by 5
//     else if (i % 3 === 0) console.log('Fizz');
//     //  c) print out Fizz if it is only divisible by 3
//     else {
//       console.log(`${i}: ${curWord}`);
//       //  d) print out the current word if the function is successful
//       //  but not divisible by 3 or 5
//     }
//   } catch (err) {
//     //  if unsuccessful, print out provided error message
//     console.log("It shouldn't break anything!");
//   }
// }

// ASYNC SECTION BELOW
/*
  NOTE: COMMENT OUT AND RUN ONE AT A TIME. Each loop will run in order respective of itself, but 
  compared to each other, the entirety of TASK 1 will not completed before the entirety of TASK 2
  as both are added to the microtask queue, but are completed based on each event's speed
  for example: the Task 1 tasks will race against the Task 2 tasks
*/

// TASK 1, ASYNC -- conosle log + write to file, with commented out API call

// clears out file before another run through
fs.writeFileSync('testAsync.txt', '');

// instantiate promise object to chain on following promises, in numeric order
// can chain, as want prints and writes to happen only when the previous action has resolved
// therefore, by chaining each action on to the same instane of promise,
// the async actions will occur in sequential order

let promiseChain = Promise.resolve();
// build up body to send to theoretical backend. NOTE: this is not best practice
// as an async action relying on a variable outside its scope. but I wanted to
// exhibit sending an entire body to the backend
let bodyToSend = '';

for (let i = 1; i <= 100; i += 1) {
  // chain new promise instance on to promise chain
  // invoking getRandomWord returns a promise, so this will have 100 more promises
  // chained to original instance
  promiseChain = promiseChain
    .then(() => getRandomWord({ withErrors: true }))
    // if promise resolves, a word will be returned
    .then(word => {
      // print word to console
      console.log(`${i}: ${word}`);
      // append word to building string
      bodyToSend += `${i}: ${word}\n`;
      // write word to file with a newline character at the end
      fs.appendFile('testAsync.txt', `${i}: ${word}\n`, writeErr => {
        // if error in appending process, throw error directly
        if (writeErr) throw writeErr;
        // if it's the final i value, then send to backend (commented out)
        // because there's no real backend
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
      // if there's an error with a specific getRandomWord invocation
      // then console log error message, append to bodyToSend and write to file
      console.log("It shouldn't break anything!");
      bodyToSend += `It shouldn't break anything!\n`;
      fs.appendFile('testAsync.txt', `It shouldn't break anything!\n`, writeErr => {
        // similar case as above: if there's an error in write process, throw error
        if (writeErr) throw writeErr;
      });
      // if i is 100,then send to backend
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

console.log('\n\n\n\nbreak between Task 1 and Task 2\n\n\n\n');

// TASK 2, ASYNC -- write to file and console, commented out API call
// similar to TASK 1, ASYNC, except with the FizzBuzz functionality

// clears out file before another run through
fs.writeFileSync('testAsync2.txt', '');

// instantiate another promise object to chain on following promises, in numeric order
let promiseChain2 = Promise.resolve();
for (let i = 1; i <= 100; i += 1) {
  // chain new promise instance on to promise chain
  // invoking getRandomWord returns a promise, so this will have 100 more promises
  // chained to original instance
  promiseChain2 = promiseChain2
    .then(() => getRandomWord({ withErrors: true }))
    .then(word => {
      // instantiate new string variable, to know what to console log and what to append
      // to txt file
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
        // if error in write process, throw error
        if (writeErr) throw writeErr;
      });
    })
    .catch(err => {
      // console log and write error message if getRandomWord errors out
      console.log("It shouldn't break anything!");
      fs.appendFile('testAsync2.txt', `It shouldn't break anything!\n`, writeErr => {
        // if error in write process, throw error
        if (writeErr) throw writeErr;
      });
    });
}

console.log('\n\n\n\nend of both tasks in main thread\n\n\n\n');
