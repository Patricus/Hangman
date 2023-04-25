export default async function handler(req, res) {
  const response = await fetch("https://api.api-ninjas.com/v1/randomword", {
    method: "GET",
    headers: {
      "X-Api-Key": process.env.WORD_API_KEY,
    },
  });

  if (!response.ok) {
    res.status(500).json({ error: "Failed to fetch word" });
    return;
  }

  const data = await response.json();

  if (data.error) {
    res.status(500).json({ error: data.error });
    return;
  }

  res.status(200).json({ word: data.word });
  return;
}
