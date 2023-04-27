import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function gameOverModal({ guessedLetters, wrongGuesses, word, won, newGame }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  function handleAddLeaderboard(e) {
    e.preventDefault();
    if (name === "") {
      setNameError("Please enter a name");
      return;
    }
    try {
      fetch("/api/leaderboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, score: word.length - wrongGuesses, word }),
      });
    } catch (error) {
      console.error("ERROR:", error);
    }

    setNameError("");
    router.push("/leaderboard");
  }

  return (
    <section className="fixed top-0 left-0 w-full h-full z-50 overflow-hidden">
      <div className="absolute w-screen h-full bg-neutral-600 opacity-40"></div>
      <div className="absolute top-1/2 left-0 sm:left-1/2 transform sm:-translate-x-1/2 -translate-y-1/2 w-full sm:w-2/3 lg:w-[900px] h-2/3 bg-slate-50 rounded flex flex-col items-center justify-around">
        <h2 className="text-3xl font-bold">{`${won ? "WINNER" : "GAME OVER"}!`}</h2>
        <div>
          <span className="text-lg">{`The word was `}</span>
          {word.split("").map((letter, index) => (
            <span
              key={index}
              className={`text-2xl font-bold ${
                guessedLetters.includes(letter) ? "text-green-700" : "text-red-900"
              }`}>
              {letter.toUpperCase()}
            </span>
          ))}
        </div>
        <div>
          <span className="text-lg">You guessed</span>
          <span className="text-2xl font-bold">{` ${guessedLetters.length} `}</span>
          <span className="text-lg">letters</span>
        </div>
        <div>
          <span className="text-lg">You made</span>
          <span className="text-lg font-bold">{` ${wrongGuesses} `}</span>
          <span className="text-lg">wrong guesses</span>
        </div>
        <div className="flex justify-evenly w-full items-end">
          <Link href={"/"}>
            <button className="transition-color font-bold rounded p-1 bg-blue-600 hover:bg-blue-500">
              Home Page
            </button>
          </Link>
          {won ? (
            <form className="relative flex flex-col gap-2 items-center">
              <label htmlFor="name">Enter name:</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="border-2 border-gray-400 rounded text-center"
              />
              <div className="absolute top-3 text-red-600 font-semibold">{nameError}</div>
              <button
                className="transition-color font-bold rounded p-1 bg-blue-600 hover:bg-blue-500"
                onClick={handleAddLeaderboard}>
                Add to Leaderboard
              </button>
            </form>
          ) : (
            <Link href="/leaderboard">
              <button className="font-semibold transition-colors bg-blue-600 hover:bg-blue-500 rounded-md p-1 ">
                Leaderboard
              </button>
            </Link>
          )}
          <div>
            <button
              onClick={newGame}
              className="transition-color font-bold rounded p-1 bg-blue-600 hover:bg-blue-500">
              New Game!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default gameOverModal;
