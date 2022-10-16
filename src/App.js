import { useEffect, useState } from "react";
import { Dna } from "react-loader-spinner";

import "./App.css";

const wordEndings = ["ff", "ll", "ss", "tt", "zz"];
const wordEndingsSize = wordEndings.length;
const wordUsage = {};

const result = [];
let number = 0;

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
  const [ready, setReady] = useState(null);
  const [currentResult, setCurrentResult] = useState([]);
  const [primes, setPrimes] = useState([]);
  const [err, setErr] = useState("");

  const isPrime = (number) => {
    for (let n = 3; n <= ~~Math.sqrt(number); n += 2) {
      if (number % n === 0) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {

    async function doProcess(lastOne, number) {
    
      // Randomly pick a word ending
      let randomNum = ~~(Math.random() * wordEndingsSize);

      // Fetch a 5 letter word with this word ending
      try {
        // fetch data from remote API
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
            `Error! status: ${response.status} whilst processing number ${number}` +
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
          (element) => element.score > 200 && !(element.score in wordUsage)
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
                `Error! status: ${response.status} whilst processing number ${number}` +
                  `word ending ${anEnding}`
              );
            }

            result = await response.json();
            // ensure suitably scored word has NOT been selected used already for a previous prime number
            verify = result.find(
              (element) => element.score > 200 && !(element.score in wordUsage)
            );
            if (verify !== undefined) {
              foundFlag = true;
              break;
            }
          }

          if (!foundFlag) {
            // I cannot see this ever happening
            throw new Error(
              `Cannot find an alternative for number ${number} and words ending with ${usedEnding}`
            );
          }
        }

        /* EG
        {word: 'scott', score: 627}
        */
      
          console.log(verify);
          wordUsage[verify.word] = number;
          console.log(wordUsage);
          setCurrentResult((currentResult) => [...currentResult, lastOne]);
      } catch (err) {
        setErr(err.message);
      }
    }

    // FUNCTION DEFINITION ENDS
    // USEEFFECT CODE STARTS

    if (++number > 100) {
      throw Error(11); // stop here & inspect the results
    }

    let nonPrime = false;
    let newEntry;
    if (number % 3 === 0 && number % 5 === 0) {
      newEntry = { text: "FizzBuzz", colour: "fizzbuzz-colour" };
      nonPrime = true;
    } else if (number % 3 === 0) {
      newEntry = { text: "Fizz", colour: "fizz-colour" };
      nonPrime = true;
    } else if (number % 5 === 0) {
      newEntry = { text: "Buzz", colour: "buzz-colour" };
      nonPrime = true;
    } else {
      newEntry = { text: String(number), colour: "" };
    }

    if (nonPrime) {
        // Use the functional or "updater" form of the state setter
        // to prevent 'an infinite chain of updates
        setCurrentResult((currentResult) => [...currentResult, newEntry]);
        return;
    }

    const lastOne = { text: String(number), colour: "" }
    console.log(lastOne)
    if (
      !( // If None are ALL TRUE?
        number > 1 &&
        number % 2 !== 0 && // even numbers - ignore!)
        isPrime(number)
      )
    ) { 
        setCurrentResult((currentResult) => [...currentResult, newEntry]);
        return;
    }


      /*
        EG
          {text: '7', colour: ''}
        */
    
    setPrimes((primes) => [...primes, number]);
    doProcess(lastOne, number);

      console.log(currentResult);
      console.log(lastOne);
      throw Error(1); // stop here & inspect the results

    // setReady(true); // Indicate that it is ready to Display the Results
  }, [ready, currentResult, primes]);

  return (
    <>
      {err && <h2>{err}</h2>}
      {!ready && (
      <div className="centre-spinner">
        <Dna
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
      )}
    </>
  );
  /*
  // don't render until 'result' is ready!
  return <div>{ready && <Output result={result} />}</div>;
  */
}

export default App;
