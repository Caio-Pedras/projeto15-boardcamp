import db from "../config/db.js";
export async function getGames(req, res) {
  const { name } = req.query;
  try {
    if (!name) {
      const result = await db.query(`
      SELECT *
      FROM games;`);
      return res.send(result.rows);
    }
    const result = await db.query(
      `
    SELECT *
    FROM games
    Where name
    LIKE $1;`,
      [`${name}%`]
    );
    res.send(result.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
export async function createGame(req, res) {
  try {
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
