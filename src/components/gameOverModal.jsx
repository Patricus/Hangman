import React from "react";

function gameOverModal({ win, newGame }) {
  return (
    <section className="absolute w-screen h-screen z-50">
      <div className="w-full h-full bg-neutral-600 opacity-40"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-slate-50 rounded">
        <h2 className="text-xl font-bold">{`You ${win ? "win" : "lose"}!`}</h2>
        <button
          onClick={newGame}
          className="transition-color rounded p-1 bg-blue-600 hover:bg-blue-500">
          New Game!
        </button>
      </div>
    </section>
  );
}

export default gameOverModal;
