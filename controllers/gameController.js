import db from "../config/db.js";
export async function getGames(req, res) {
  const { name } = req.query;
  try {
    const params = [];
    let whereText = "";
    if (name) {
      params.push(`${name}%`);
      whereText += `WHERE games.name ILIKE $${params.length}`;
    }

    const result = await db.query(
      `
    SELECT games.*, categories.name AS "categoryName"
    FROM games
    JOIN categories ON categories.id=games."categoryId"
    ${whereText}
    `,
      params
    );
    res.send(result.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
export async function createGame(req, res) {
  const game = req.body;
  try {
    const result = await db.query("SELECT id FROM categories WHERE id = $1", [
      game.categoryId,
    ]);
    if (result.rows.length === 0) {
      return res.sendStatus(400);
    }
    await db.query(
      `
    INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay")
    VALUES($1,$2,$3,$4,$5)
    `,
      [
        game.name,
        game.image,
        Number(game.stockTotal),
        game.categoryId,
        Number(game.pricePerDay),
      ]
    );
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
