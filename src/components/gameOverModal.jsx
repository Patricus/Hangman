import React from "react";

function gameOverModal({ guessedLetters, wrongGuesses, word, win, newGame }) {
  return (
    <section className="absolute w-screen h-screen z-50">
      <div className="w-full h-full bg-neutral-600 opacity-40"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-slate-50 rounded flex flex-col items-center justify-around">
        <h2 className="text-3xl font-bold">{`${win ? "WINNER" : "GAME OVER"}!`}</h2>
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
        <div className="flex justify-evenly w-full">
          <button
            onClick={newGame}
            className="transition-color font-bold rounded p-1 bg-blue-600 hover:bg-blue-500">
            New Game!
          </button>
          {win ? (
            <button className="transition-color font-bold rounded p-1 bg-blue-600 hover:bg-blue-500">
              Add to leaderboard
            </button>
          ) : (
            <button className="transition-color font-bold rounded p-1 bg-blue-600 hover:bg-blue-500">
              View leaderboard
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default gameOverModal;
