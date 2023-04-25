// This is the setup for the game page

import Head from "next/head";
import { useState } from "react";

const Hangman = ({ word }) => {
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);

  const handleGuess = (letter) => {
    if (word.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
    } else {
      setIncorrectGuesses(incorrectGuesses + 1);
    }
  };

  const displayWord = () => {
    return word.split("").map((letter) => {
      return guessedLetters.includes(letter) ? letter : "_";
    });
  };

  const displayLetters = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    return letters.map((letter) => {
      return (
        <div className="inline-block justify-center items-center py-1">
          <button
            className="font-semibold m-2 bg-red-200 px-1 border rounded-md border-cyan-500"
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={
              guessedLetters.includes(letter) || checkWin() || checkLoss()
            }
          >
            {letter}
          </button>
        </div>
      );
    });
  };

  const displayHangman = () => {
    return (
      <div className="w-full h-full bg-slate-100 justify-center items-center flex">
        <img src={`hangman${incorrectGuesses}.png`} alt="Hangman" />
      </div>
    );
  };

  const checkWin = () => {
    return displayWord().join("") === word;
  };

  const checkLoss = () => {
    return incorrectGuesses >= 6;
  };

  return (
    <div>
      {displayWord()}
      {displayLetters()}
      {displayHangman()}
      {checkWin() && <div>You win!</div>}
      {checkLoss() && <div>You lose!</div>}
    </div>
  );
};

export default function Home() {
  const [word, setWord] = useState("");
  const [category, setCategory] = useState("");

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const chooseRandomWord = () => {
    let wordList = [];
    switch (category) {
      case "country":
        wordList = ["USA", "CANADA", "MEXICO", "FRANCE", "ITALY"];
        break;
      case "fruit":
        wordList = ["APPLE", "BANANA", "ORANGE", "GRAPE", "PINEAPPLE"];
        break;
      default:
        wordList = ["HELLO", "WORLD", "COMPUTER", "PROGRAMMING"];
        break;
    }
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
  };

  const handleNewGame = () => {
    const randomWord = chooseRandomWord();
    setWord(randomWord);
  };

  return (
    <>
      <Head>
        <title>Hangman</title>
        <meta name="description" content="Hangman - Super League Level 3" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-3xl font-bold underline">Hangman!</h1>
        <div className="flex p-3">
          <div className="justify-center items-center flex flex-1 gap-6 bg-slate-100 py-1">
            <select
              className="font-semibold flex bg-transparent"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">Select a category</option>
              <option value="country">Country</option>
              <option value="fruit">Fruit</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="justify-center items-center flex flex-1  bg-slate-100 py-1">
            <button
              className="font-semibold bg-teal-200 rounded-md p-1 "
              onClick={handleNewGame}
            >
              New Game
            </button>
          </div>
        </div>
        <div>{word && <Hangman word={word} />}</div>
      </main>
    </>
  );
}
