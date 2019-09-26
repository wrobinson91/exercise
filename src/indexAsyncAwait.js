const fs = require('fs');
const { getRandomWordSync, getRandomWord } = require('word-maker');

// if running on second time or later, clear out text file
fs.writeFileSync('testAsyncAwait.txt', '');

// write an async function as an IIFE
(async function task1AsyncAwait() {
  // instantiate variable for word returned from function and the phrase to ultimately
  // print out and write

  let newWord;
  let phraseToPrint;

  for (let i = 1; i <= 100; i += 1) {
    // try block: invoke function with errors. either the promise returned will resolve with a word\
    // or an error will be thrown. if no error occurs, newWord is assigned a word, and phraseToPrint
    // is assigned the normal syntax
    try {
      newWord = await getRandomWord({ withErrors: true });
      phraseToPrint = `${i}: ${newWord}`;
    } catch (err) {
      // catch block: if there is an error, then the declared error message
      // will be the phrase to print/write
      phraseToPrint = "It shouldn't break anything!";
    } finally {
      // finally block: no matter if there's a new word or an error, the result must be printed and written
      // to the file
      console.log(phraseToPrint);
      fs.appendFile('testAsyncAwait.txt', `${phraseToPrint}\n`, writeErr => {
        // if there's an error in write process, throw error
        if (writeErr) throw writeErr;
      });
    }
  }
})();
