// This is the leaderboard page
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gallows from "public/images/gallows.svg";
import man from "public/images/hangmanfigure.svg";

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
      <div className="absolute w-screen h-screen top-0 left-0 -z-50 overflow-hidden">
        <div className="absolute w-2/3 h-px left-1/4 top-1/3 animate-[spin_60s_linear_infinite]">
          <div className="absolute left-0 top-0 w-3/4 origin-bottom-left animate-[spin_50s_linear_infinite]">
            <Image
              className="absolute left-0 top-0 w-1/2 origin-top-right animate-[spin_25s_linear_infinite]"
              src={gallows}
              alt="gallows"
            />
          </div>
          <div className="absolute right-0 top-0 w-1/4 origin-bottom-right animate-[spin_55s_linear_infinite]">
            <Image
              className="absolute left-0 top-0 origin-top-left w-1/2 animate-[spin_30s_linear_infinite]"
              src={man}
              alt="hangman"
            />
          </div>
        </div>
      </div>
      <div className="fixed -bottom-1 lg:left-1/2 lg:-translate-x-1/2 z-10 bg-slate-100 w-screen lg:w-[1000px] flex justify-evenly items-center py-2 border-t-4 lg:border-x-4 border-teal-800">
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
        <table className="border-spacing-0 opacity-90 max-w-3xl w-11/12 sm:w-9/12 border-4 border-teal-800 mt-2">
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
                  <td colSpan="4" className="text-center bg-slate-100">
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
                <td colSpan="4" className="text-center bg-slate-100">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <div className="h-14"></div>
    </>
  );
}

export default leaderboard;
