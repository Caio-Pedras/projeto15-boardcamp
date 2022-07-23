import db from "../config/db.js";
export async function getRents(req, res) {
  const { customerId, gameId } = req.query;
  let params = [];
  let whereText = "";
  if (customerId) {
    params.push(customerId);
    whereText += `WHERE "customerId" = $${params.length}`;
  }
  if (gameId) {
    params.push(gameId);
    whereText += `WHERE "customerId" = $${params.length}`;
  }
  const result = await db.query(
    {
      text: `
      SELECT
        rentals.*,
        customers.name AS customer,
        games.name,
        categories.*,
      FROM rentals
        JOIN customers ON customers.id=rentals."customerId"
        JOIN games ON games.id=rentals."gameId"
        JOIN categories ON categories.id=games."categoryId"
        ${whereText}
      `,
      rowMode: "array",
    },
    params
  );
  try {
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
export async function createRent(req, res) {
  try {
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function finishRent(req, res) {
  try {
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
export async function deleteRent(req, res) {
  try {
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
