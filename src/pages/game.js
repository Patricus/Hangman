// This is the game page
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

function Game() {
  const [word, setWord] = useState("");
  const router = useRouter();
  const wordInitialized = useRef(false);

  // Set the word from the query string if it exists
  useEffect(() => {
    if (router.isReady) {
      const query = router.query;
      if (query.word) {
        setWord(query.word);
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
    await setWord(data.word);
    if (word !== router.query.word) {
      router.push(`?word=${data.word}`, undefined, { shallow: true });
    }
  }

  return (
    <div>
      <p>Selected word: {word}</p>
    </div>
  );
}

export default Game;
