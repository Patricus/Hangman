import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Hangman</title>
        <meta name="description" content="Hangman - Super League Level 3" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-3xl font-bold underline">Hangman!</h1>
      </main>
    </>
  );
}
