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
> - A list of blanks that will be filled in as correct letters are guessed
> - A message that will display if the game is over and if the player won or lost
>   - An input field to enter a name on game over (for leaderboard)

The word will be taken from an api call to `https://api.api-ninjas.com/v1/randomword`. The URL will have a query `?word=` lightly encrypted using the `cryptr` package. Encryption is done to prevent cheating by looking at the page source.

> [Cryptr](https://www.npmjs.com/package/cryptr)
>
> [Words API](https://api-ninjas.com/)
> Create an account and get an API key. Use the API key in your .env.local file.
> **Note:** The Words API is free for 50,000 requests per month. If you go over that, you will be charged.

### Leaderboard

Create leaderboard page `pages/leaderboard.js`. This page will have a list of players their scores, number of incorrect guesses and the word. The scores will be stored in a database.
