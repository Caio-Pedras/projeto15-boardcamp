import db from "../config/db.js";

export async function getCategories(req, res) {
  try {
    const result = await db.query(`
    SELECT *
    FROM categories;`);
    res.send(result.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
export async function createCategory(req, res) {
  const category = req.body;
  try {
    const result = await db.query("SELECT id FROM categories WHERE name=$1", [
      category.name,
    ]);
    if (result.rows.length > 0) {
      return res.sendStatus(409);
    }
    await db.query(`INSERT INTO categories(name) VALUES ($1)`, [category.name]);
    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
