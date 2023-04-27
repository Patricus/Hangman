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
      <Link href={"/"}>
        <button className="fixed top-1 left-1 transition-color font-bold rounded p-1 bg-blue-600 hover:bg-blue-500">
          Home Page
        </button>
      </Link>
      <section className="flex justify-center">
        <table className="max-w-3xl w-11/12 sm:w-9/12 border-8 border-teal-800 mt-2">
          <thead className="sticky -top-1">
            <tr className="bg-gray-300">
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard ? (
              leaderboard.map((entry, index) => (
                <tr key={index} className={`${index % 2 === 0 ? "bg-slate-100" : "bg-slate-200"}`}>
                  <td className={`text-center ${index === 0 && "font-bold"}`}>{index + 1}</td>
                  <td className={`text-center ${index === 0 && "font-bold"}`}>{entry.name}</td>
                  <td className={`text-center ${index === 0 && "font-bold"}`}>{entry.score}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default leaderboard;
