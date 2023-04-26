// This is the game page
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Cryptr from "cryptr";
import gallows from "public/images/gallows.svg";
import man from "public/images/hangmanfigure.svg";
import GameOverModal from "../components/gameOverModal";

function Game() {
  const router = useRouter();
  const cryptr = new Cryptr("HangmanGame", { pbkdf2Iterations: 1, saltLength: 0 });

  const [isFetching, setIsFetching] = useState(false);
  const inputRef = useRef(null);
  const [word, setWord] = useState("");
  const [encryptedWord, setEncryptedWord] = useState(null);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [guess, setGuess] = useState("");
  const [won, setWon] = useState(false);

  // Fetch a random word from the API
  async function randomWord() {
    if (isFetching) return;
    setIsFetching(true);
    const response = await fetch("/api/randomWord");
    const data = await response.json();
    setEncryptedWord(cryptr.encrypt(data.word));
  }

  // Focus the input field on load
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Check query params for a word
  useEffect(() => {
    if (router.isReady) {
      const { word } = router.query;
      if (word && word.length > 0) {
        try {
          cryptr.decrypt(word);
          setEncryptedWord(word);
        } catch (error) {
          setEncryptedWord("");
          return;
        }
      }
    }
  }, [router]);

  // New encrypted word
  useEffect(() => {
    if (encryptedWord === null) return;
    if (encryptedWord === "") {
      randomWord();
      return;
    }
    isFetching && setIsFetching(false);

    router.push(`?word=${encryptedWord}`, undefined, { shallow: true });
    setWord(cryptr.decrypt(encryptedWord));
    setGuessedLetters([]);
    setWrongGuesses(0);
  }, [encryptedWord]);

  // Handle the guess input
  function handleGuess(event) {
    const letter = event.target.value.split("")[0].toLowerCase();
    if (!guessedLetters.includes(letter)) {
      if (!word.includes(letter)) setWrongGuesses(wrongGuesses => wrongGuesses + 1);
      setGuessedLetters(guessedLetters => [...guessedLetters, letter]);
    }
    setGuess("");
    if (wrongGuesses < 6 || won) inputRef.current.focus();
  }

  // Handle win
  useEffect(() => {
    setWon(word.length > 0 && word.split("").every(letter => guessedLetters.includes(letter)));
  }, [guessedLetters]);

  return (
    <div>
      {(wrongGuesses > 5 || won) && <GameOverModal win={won} newGame={randomWord} />}
      <p>Selected word: {word}</p>
      <section>
        <h2>Number of wrong guesses: {wrongGuesses}</h2>
        <div>
          <h3>Missed letters:</h3>
          <p>{guessedLetters.filter(letter => !word.includes(letter)).join(", ")}</p>
        </div>
        <div className=" flex justify-center w-screen h-fit">
          <div className="relative">
            <Image src={gallows} alt="Gallows" width={500} priority />
            <div className="absolute bottom-14 right-[4.7rem] -z-10">
              <div
                className={`${
                  wrongGuesses > 0 && "scale-y-0"
                } transition-transform origin-bottom duration-1000 absolute w-20 h-[80px] bg-white`}></div>
              <div
                className={`${
                  wrongGuesses > 1 && "scale-y-0"
                } transition-transform origin-bottom duration-1000 absolute w-3 h-[80px] left-8 top-20 bg-white`}></div>
              <div
                className={`${
                  wrongGuesses > 2 && "scale-y-0"
                } transition-transform origin-bottom duration-1000 absolute w-[35px] h-[80px] left-0 top-20 bg-white`}></div>
              <div
                className={`${
                  wrongGuesses > 3 && "scale-y-0"
                } transition-transform origin-bottom duration-1000 absolute w-[41px] h-[80px]  right-0 top-20 bg-white`}></div>
              <div
                className={`${
                  wrongGuesses > 4 && "scale-y-0"
                } transition-transform origin-bottom duration-1000 absolute w-[44px] h-[45px]  left-0 bottom-0 bg-white`}></div>
              <div
                className={`${
                  wrongGuesses > 5 && "scale-y-0"
                } transition-transform origin-bottom duration-1000 absolute w-[44px] h-[45px]  right-0 bottom-0 bg-white`}></div>
              <Image src={man} alt="Hangman" width={80} className="-z-10" />
            </div>
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
