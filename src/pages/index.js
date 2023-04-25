// This is the setup for the game page

import Head from "next/head";

export default function Home() {
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
      </main>
    </>
  );
}
