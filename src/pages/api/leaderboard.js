import pool from "@/db/connect";

export default async function handler(req, res) {
  const db = await pool.connect();

  if (req.method === "GET") {
    try {
      const data = await db.query(
        `SELECT * FROM ${process.env.DB_SCHEMA || "public"}.leaderboard ORDER BY score DESC`
      );
      const leaderboard = data.rows;
      res.status(200).json({ leaderboard });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    } finally {
      db.release();
      return;
    }
  }
  if (req.method === "POST") {
    console.log("POST");
    const { name, score, word } = req.body;
    console.table({ name, score, word });
    if (!name || !score || !word) {
      res.status(400).json({ error: "Missing name or score" });
      db.release();
      return;
    }
    try {
      console.log("INSERT");
      await db.query(
        `INSERT INTO ${
          process.env.DB_SCHEMA || "public"
        }.leaderboard (name, score, word) VALUES ('${name}', ${score}, '${word}')`
      );
      console.log("INSERTED");
    } catch (error) {
      res.status(500).json({ error: "Failed to insert score" });
      db.release();
      return;
    }
    res.status(201).end();
    db.release();
    return;
  }
  res.status(405).json({ error: "Method not allowed" });
  db.release();
}
