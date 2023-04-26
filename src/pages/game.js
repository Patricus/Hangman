// This is the game page
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Cryptr from "cryptr";
import gallows from "public/images/gallows.svg";
import man from "public/images/hangmanfigure.svg";

function Game() {
  const router = useRouter();
  const cryptr = new Cryptr("HangmanGame", { pbkdf2Iterations: 1, saltLength: 0 });

  const wordInitialized = useRef(false);
  const inputRef = useRef(null);
  const [word, setWord] = useState("");
  const [encryptedWord, setEncryptedWord] = useState(null);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [guesses, setGuesses] = useState(0);
  const [guess, setGuess] = useState("");

  // Set the word from the query string if it exists
  useEffect(() => {
    if (router.isReady) {
      const query = router.query;
      if (query.word) {
        try {
          setWord(cryptr.decrypt(query.word).toLowerCase());
          wordInitialized.current = true;
        } catch (error) {
          // If the word is invalid, fetch a random word
          randomWord();
        }
      } else if (!wordInitialized.current) {
        // If there is no word in the query string, fetch a random word
        randomWord();
      }
    }
  }, [router]);

  // Fetch a random word from the API
  async function randomWord() {
    const response = await fetch("/api/randomWord");
    const data = await response.json();
    setEncryptedWord(cryptr.encrypt(data.word));
    setWord(data.word);
    if (encryptedWord !== router.query.word) {
      router.push(`?word=${encryptedWord}`, undefined, { shallow: true });
    }
  }

  // Initialize guessedLetters with the word
  useEffect(() => {
    setGuessedLetters([]);
  }, [word]);

  // Handle the guess input
  function handleGuess(event) {
    const letter = event.target.value.split("")[0].toLowerCase();
    if (!guessedLetters.includes(letter)) {
      setGuesses(guesses => guesses + 1);
      setGuessedLetters(guessedLetters => [...guessedLetters, letter]);
    }
    setGuess("");
    inputRef.current.focus();
  }

  // Check if the game is over
  function handleGameOver() {
    if (guesses >= 6) {
      return true;
    }
    return word.split("").every(letter => guessedLetters.includes(letter));
  }

  return (
    <div>
      <p>Selected word: {word}</p>
      <section>
        <h2>Number of guesses: {guesses}</h2>
        <div>
          <h3>Missed letters:</h3>
          <p>{guessedLetters.filter(letter => !word.includes(letter)).join(", ")}</p>
        </div>
        <div className=" flex justify-center w-screen h-fit">
          <div className="relative">
            <Image src={gallows} alt="Gallows" width={500} />
            <Image
              src={man}
              alt="Hangman"
              width={80}
              className="absolute bottom-14 right-[4.7rem] "
            />
          </div>
        </div>
      </section>
      <section className="bg-slate-200 h-20 mx-10 flex justify-center items-center gap-5">
        {word &&
          word.split("").map((letter, index) => (
            <p key={index} className="bg-slate-100 h-14 w-10 underline border border-slate-700">
              {guessedLetters.includes(letter) ? letter.toUpperCase() : " "}
            </p>
          ))}
      </section>
      <section>
        <label htmlFor="guess">Guess a letter:</label>
        <input
          type="text"
          id="guess"
          name="guess"
          value={guess}
          onChange={handleGuess}
          ref={inputRef}
        />
      </section>
    </div>
  );
}

export default Game;
