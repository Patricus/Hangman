## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Pages

### Setup

Create game setup page `pages/index.js`. This page will have a form to create a new game.

> Form fields:
>
> - Player name
> - Enter a word or randomize a word
> - Play button

This page will also have a link to the leaderboard page.

### Game

Create game page `pages/game.js`. This page will have the following:

> - An input field to enter a letter
> - A button to submit the letter
> - A list of letters that have been submitted
> - A gallows image that will change based on the number of incorrect guesses
>   - If max number of incorrect guesses is reached, the game is over

The word will be taken from an api call to `https://wordsapiv1.p.mashape.com/words/example`. Where `example` is the word that was entered on the setup page. The URL will have a query `?word=` lightly encrypted using the `cryptr` package. Encryption is done to prevent cheating by looking at the page source.

> [Cryptr](https://www.npmjs.com/package/cryptr)
>
> [Words API](https://www.wordsapi.com/)

### Leaderboard

Create leaderboard page `pages/leaderboard.js`. This page will have a list of players their scores, number of incorrect guesses and the word. The scores will be stored in a database.
