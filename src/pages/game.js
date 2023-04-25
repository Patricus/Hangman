// This is the game page
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Cryptr from "cryptr";

function Game() {
  const router = useRouter();
  const cryptr = new Cryptr("HangmanGame", { pbkdf2Iterations: 1 });

  const wordInitialized = useRef(false);
  const [word, setWord] = useState("");
  const [encryptedWord, setEncryptedWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [guesses, setGuesses] = useState(0);

  // Set the word from the query string if it exists
  useEffect(() => {
    if (router.isReady) {
      const query = router.query;
      if (query.word) {
        setWord(cryptr.decrypt(query.word));
        wordInitialized.current = true;
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
    setGuessedLetters(Array(word.length).fill(" "));
  }, [word]);

  return (
    <div>
      <p>Selected word: {word}</p>
    </div>
  );
}

export default Game;
