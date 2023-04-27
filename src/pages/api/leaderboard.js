export default async function handler(req, res) {
  const testBoard = [
    { name: "test", score: 0 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
    { name: "test2", score: 1 },
  ];

  if (req.method === "GET") {
    res.status(200).json({ leaderboard: testBoard });
    return;
  }
  if (req.method === "POST") {
    res.status(201).end();
    return;
  }
  res.status(405).json({ error: "Method not allowed" });
  return;
}
