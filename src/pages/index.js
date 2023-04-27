// This is the setup for the game page

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Cryptr from "cryptr";
import gallows from "public/images/gallows.svg";
import hangman from "public/images/hangmanfigure.svg";

export default function Home() {
  const cryptr = new Cryptr("HangmanGame", { pbkdf2Iterations: 1, saltLength: 0 });
  const [word, setWord] = useState("");

  return (
    <>
      <Head>
        <title>Hangman</title>
        <meta name="description" content="Hangman - Super League Level 3" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <main>
        <h1 className="text-6xl text-center font-bold">Hangman</h1>

        <div className="relative mt-16 flex justify-center">
          <Image
            src={gallows}
            alt="Gallows"
            width={300}
            className="absolute left-5 -top-16 -z-10 -rotate-12"
          />
          <Image
            src={hangman}
            alt="Hangman"
            width={100}
            className="absolute right-16 -top-10 -z-10 rotate-12"
          />
          <div className="justify-center items-center flex flex-col gap-5  bg-slate-200 rounded py-3 px-6">
            <label htmlFor="word" className="font-semibold">
              Enter a word:
            </label>
            <input
              placeholder="Random word"
              type="text"
              id="word"
              name="word"
              value={word}
              onChange={event => setWord(event.target.value)}
              className="mx-2 text-center"
            />
            <small>Leave blank for random word</small>
            <Link href={word.length > 0 ? `/game?word=${cryptr.encrypt(word)}` : "/game"}>
              <button className="font-semibold transition-colors bg-blue-600 hover:bg-blue-500 rounded-md p-1 ">
                New Game
              </button>
            </Link>
            <Link href="/leaderboard">
              <button className="font-semibold transition-colors bg-blue-600 hover:bg-blue-500 rounded-md p-1 ">
                Leaderboard
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
