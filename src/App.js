import { useState } from "react";
import { Dna } from "react-loader-spinner";

import "./App.css";

const wordEndings = ["ff", "ll", "ss", "tt", "zz"];
const wordEndingsSize = wordEndings.length;

const wordColours = [
  "pink-colour",
  "aqua-colour",
  "purple-colour",
  "palered-colour",
  "deeporange-colour",
  "bluegrey-colour",
];
const wordColoursSize = wordColours.length;

const wordUsage = {};

function Output({ result }) {
  return (
    <div className="flexbox-container">
      {result.map((element, index) => {
        const { text: buttonText, colour: buttonColour } = element;
        return (
          <div key={index} className={`button-6 flexbox-item ${buttonColour}`}>
            <div>{buttonText}</div>
          </div>
        );
      })}
    </div>
  );
}

function App() {
  const [listReady, setListReady] = useState(null);
  const [err, setErr] = useState("");

  const resultsList = [];
  const allPrimes = [];
  // i.e. [7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]

  const isPrime = (number) => {
    for (let n = 3; n <= ~~Math.sqrt(number); n += 2) {
      if (number % n === 0) {
        return false;
      }
    }
    return true;
  };

  // Use the REDUCE METHOD to handle the Fetch APIs and Promises
  const handlePrimes = async (setListReady) => {
    let finalResult;
    try {
      finalResult = await allPrimes.reduce(
        async (previousPromise, primeNumber) => {
          const numbersArray = await previousPromise;

          // Randomly pick a word ending
          let randomNum = (Math.random() * wordEndingsSize) << 0;

          // Fetch a 5 letter word with this word ending

          const response = await fetch(
            `https://api.datamuse.com/words?sp=???${wordEndings[randomNum]}`,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error(
              `Error! status: ${response.status} whilst processing number ${primeNumber}` +
                ` word ending ${wordEndings[randomNum]}`
            );
          }

          let result = await response.json();
          /*
             Only use if the score is above 200
             Although Datamuse's documentation states that
             the "score" field has no interpretable meaning, other than as a way to rank the results.
             From what I can see, anything below 200 is either a slang word or a very obscure word
             So chose above 200
             EG
                 {
                  "word": "dwell",
                  "score": 3780
                 },
                 {word: 'grass', score: 4805}

             Also ensure the word has NOT already been selected for a previous prime number
        */

          let verify = result.find(
            (element) => element.score > 200 && !(element.word in wordUsage)
          );

          // Ensure that the word has not been used before
          if (verify === undefined) {
            /*
              If the word has been used before and there are no other suitable candidates in 'result'
              then find an alternative using the other possible wordEndings
          */

            let usedEnding = wordEndings[randomNum];
            let foundFlag = false;
            for (const anEnding of wordEndings) {
              if (anEnding === usedEnding) {
                // ignore this one - used already
                continue;
              }

              // fetch alternative word from remote API
              const response = await fetch(
                `https://api.datamuse.com/words?sp=???${anEnding}`,
                {
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                  },
                }
              );

              if (!response.ok) {
                throw new Error(
                  `Error! status: ${response.status} whilst processing number ${primeNumber}` +
                    ` word ending ${anEnding}`
                );
              }

              result = await response.json();
              // ensure suitably scored word has NOT been selected used already
              // for a previous prime number
              verify = result.find(
                (element) => element.score > 200 && !(element.word in wordUsage)
              );
              if (verify !== undefined) {
                foundFlag = true;
                break;
              }
            }

            if (!foundFlag) {
              // I cannot see this ever happening
              throw new Error(
                `Cannot find an alternative for number ${primeNumber} and words ending with ${usedEnding}`
              );
            }
          }

          /* EG
        {word: 'scott', score: 627}
        */

          wordUsage[verify.word] = primeNumber;

          // Add to the array by updating the prime number's slot
          // However use a random colour
          randomNum = (Math.random() * wordColoursSize) << 0;
          numbersArray.push({
            number: primeNumber,
            text: verify.word,
            // colour: "buzz-colour",
            // USE A RANDOM COLOUR
            // Randomly pick a colour
            colour: wordColours[randomNum],
          });

          return numbersArray;
        },
        Promise.resolve(resultsList) // The current list of NonPrimes - add to it
      );
    } catch (err) {
      setErr(err.message);
    }

    sortAndDisplay(setListReady,finalResult);
  };

  
  const sortAndDisplay = (setListReady,resultsList) => {
    const sortedList = resultsList.sort(function (a, b) {
      return a.number - b.number;
    });
    setListReady(sortedList);
  }; 


  const Process100Numbers = ({setListReady}) => {

    for (let number = 1; number <= 100; number++) {
      let nonPrime = false;
      let newEntry;
      if (number % 3 === 0 && number % 5 === 0) {
        newEntry = {
          number: number,
          text: "FizzBuzz",
          colour: "fizzbuzz-colour",
        };
        nonPrime = true;
      } else if (number % 3 === 0) {
        newEntry = { number: number, text: "Fizz", colour: "fizz-colour" };
        nonPrime = true;
      } else if (number % 5 === 0) {
        newEntry = { number: number, text: "Buzz", colour: "buzz-colour" };
        nonPrime = true;
      } else {
        newEntry = { number: number, text: String(number), colour: "" };
      }

      if (
        nonPrime ||
        !(
          // If None are ALL TRUE?
          (
            number > 1 &&
            number % 2 !== 0 && // even numbers - ignore!
            isPrime(number)
          )
        )
      ) {
        resultsList.push(newEntry);
      } else {
        allPrimes.push(number);
      }
    }

    /* 
      Now process all the prime numbers
      That is, perform a Fetch API for a random word to associate with each prime number
      Check that the words have NOT been used for a previous prime number
      I have decide to use the 'reduce' method for this process - see handlePrimes()
    */
   
    handlePrimes(setListReady);
  };

  return (
    <>
      {/* Error Handling */}
      {err && <h2>{err}</h2>}

      {/* Show Spinner Until All The Prime Numbers have been determined */}
      {!err && !listReady && (
        <div className="centre-spinner">
          <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
          <Process100Numbers setListReady={setListReady} />
        </div>
      )}

      {/* Display the Results */}
      {!err && listReady && <Output result={listReady} />}
    </>
  );
}

export default App;
