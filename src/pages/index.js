// This is the setup for the game page

import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Cryptr from "cryptr";

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
        <h1 className="text-3xl font-bold underline">Hangman!</h1>
        <div className="flex p-3">
          <div className="justify-center items-center flex flex-1  bg-slate-100 py-1">
            <label htmlFor="word" className="font-semibold">
              Enter a word:
            </label>
            <input
              type="text"
              id="word"
              name="word"
              value={word}
              onChange={event => setWord(event.target.value)}
              className="mx-2"
            />
            <Link href={word.length > 0 ? `/game?word=${cryptr.encrypt(word)}` : "/game"}>
              <button className="font-semibold bg-teal-200 rounded-md p-1 ">New Game</button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
