// This is the leaderboard page
import { useEffect, useState } from "react";
import Link from "next/link";

function leaderboard() {
  const [leaderboard, setLeaderboard] = useState();

  useEffect(() => {
    fetch("/api/leaderboard")
      .then(response => response.json())
      .then(data => setLeaderboard(data.leaderboard));
  }, [setLeaderboard]);

  return (
    <>
      <h1 className="text-center text-3xl font-bold">Leaderboard</h1>
      <div className="fixed bottom-0 lg:left-1/2 lg:-translate-x-1/2 z-10 bg-slate-100 w-screen lg:w-[1000px] flex justify-evenly items-center py-1 border-t-4 lg:border-x-4 border-teal-800">
        <Link href={"/"}>
          <button className="transition-color font-bold rounded p-1 bg-blue-600 hover:bg-blue-500">
            Home Page
          </button>
        </Link>
        <p className="text-xs sm:text-sm w-1/3 sm:w-1/2 md:text-base">
          Score calculation: word length minus incorrect guesses.
        </p>
      </div>
      <section className="flex justify-center">
        <table className="max-w-3xl w-11/12 sm:w-9/12 border-4 border-teal-800 mt-2">
          <thead className="sticky -top-1">
            <tr className="bg-gray-300">
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
              <th>Word</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard ? (
              leaderboard.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No entries yet
                  </td>
                </tr>
              ) : (
                leaderboard.map((entry, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-slate-100" : "bg-slate-200"}`}>
                    <td className={`text-center ${index === 0 && "font-bold"}`}>{index + 1}</td>
                    <td className={`text-center ${index === 0 && "font-bold"}`}>{entry.name}</td>
                    <td className={`text-center ${index === 0 && "font-bold"}`}>{entry.score}</td>
                    <td className={`text-center ${index === 0 && "font-bold"}`}>{entry.word}</td>
                  </tr>
                ))
              )
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <div className="h-10"></div>
    </>
  );
}

export default leaderboard;
