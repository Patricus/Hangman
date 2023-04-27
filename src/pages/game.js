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
    if (wrongGuesses < 6 || won) inputRef.current.focus();
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
    //TESTING
    console.log("word", cryptr.decrypt(encryptedWord));
    setGuessedLetters([]);
    setWrongGuesses(0);
  }, [encryptedWord]);

  // Handle the guess input
  function handleGuess(event) {
    if (wrongGuesses > 5 || won) return;
    const letter = event.target.value.split("")[0].toLowerCase();
    if (!guessedLetters.includes(letter)) {
      if (!word.includes(letter)) setWrongGuesses(wrongGuesses => wrongGuesses + 1);
      setGuessedLetters(guessedLetters => [...guessedLetters, letter]);
    }
    setGuess("");
  }

  // Handle win
  useEffect(() => {
    setWon(word.length > 0 && word.split("").every(letter => guessedLetters.includes(letter)));
  }, [guessedLetters]);

  return (
    <>
      {(wrongGuesses > 5 || won) && (
        <GameOverModal
          guessedLetters={guessedLetters}
          wrongGuesses={wrongGuesses}
          word={word}
          won={won}
          newGame={randomWord}
        />
      )}
      <section>
        <h1 className="text-6xl text-center font-bold">Hangman</h1>
        <div className=" flex justify-center w-screen">
          <div className="relative">
            <Image src={gallows} alt="Gallows" width={500} />
            <div className="absolute bottom-[12%] right-[16%] h-[40%] w-[15%] -z-10">
              <div
                className={`${
                  wrongGuesses > 0 && "scale-y-0"
                } transition-transform origin-bottom duration-1000 absolute -top-1 w-full h-[42%] bg-white`}></div>
              <div
                className={`${
                  wrongGuesses > 1 && "scale-y-0"
                } transition-transform origin-bottom duration-1000 absolute w-[15%] h-[45%] left-[40%] top-[35%] bg-white`}></div>
              <div
                className={`${
                  wrongGuesses > 2 && "scale-y-0"
                } transition-transform origin-bottom duration-1000 absolute w-[43%] h-[40%] left-0 top-[40%] bg-white`}></div>
              <div
                className={`${
                  wrongGuesses > 3 && "scale-y-0"
                } transition-transform origin-bottom duration-1000 absolute w-[50%] h-[40%]  right-0 top-[40%] bg-white`}></div>
              <div
                className={`${
                  wrongGuesses > 4 && "scale-y-0"
                } transition-transform origin-bottom duration-1000 absolute w-[45%] h-[24%]  left-0 bottom-0 bg-white`}></div>
              <div
                className={`${
                  wrongGuesses > 5 && "scale-y-0"
                } transition-transform origin-bottom duration-1000 absolute w-[51%] h-[24%]  right-0 bottom-0 bg-white`}></div>
              <Image src={man} alt="Hangman" fill className="-z-10" />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-slate-200 h-20 md:mx-10 flex justify-center items-center gap-5">
        {word &&
          word.split("").map((letter, index) => (
            <p
              key={index}
              className="bg-slate-100 h-7 sm:h-9 md:h-11 lg:h-14 w-5 sm:w-7 md:w-8 lg:w-10 border border-slate-700 text-2xl font-bold flex items-center justify-center text-green-700">
              {guessedLetters.includes(letter) ? letter.toUpperCase() : " "}
            </p>
          ))}
      </section>
      <section className="bg-slate-200 md:mx-10 flex flex-col items-center h-24 border-t-2 border-slate-400">
        <h2 className="text-lg font-bold">Wrong Guesses</h2>
        <div className="flex justify-center items-center gap-5">
          {guessedLetters &&
            guessedLetters
              .filter(letter => !word.includes(letter))
              .map((letter, index) => (
                <p
                  key={index}
                  className="bg-slate-100 h-7 sm:h-9 md:h-11 lg:h-14 w-5 sm:w-7 md:w-8 lg:w-10 border border-slate-700 text-2xl font-bold flex items-center justify-center text-red-700">
                  {letter.toUpperCase()}
                </p>
              ))}
        </div>
      </section>
      <section className="flex flex-col items-center">
        <label className="text-xl" htmlFor="guess">
          Guess a letter:
        </label>
        <input
          className="border border-slate-700 w-10 text-2xl text-center rounded"
          type="text"
          id="guess"
          name="guess"
          value={guess}
          onChange={handleGuess}
          ref={inputRef}
        />
      </section>
    </>
  );
}

export default Game;
