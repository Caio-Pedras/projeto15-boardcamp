import db from "../config/db.js";
export async function getCustomers(req, res) {
  const { cpf } = req.query;
  try {
    if (!cpf) {
      const result = await db.query(`
      SELECT *
      FROM customers;`);
      return res.send(result.rows);
    }
    const result = await db.query(
      `
    SELECT * 
    FROM customers
    LIKE $1;`,
      [`${cpf}%`]
    );
    res.send(result.rows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
export async function getCustomerById(req, res) {
  const { id } = req.params;
  try {
    const result = await db.query(
      `
    SELECT *
    FROM customers
    WHERE id=$1;`,
      [id]
    );
    if (result.rows.length === 0) {
      return res.sendStatus(404);
    }
    res.send(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
export async function createCustomer(req, res) {
  try {
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
export async function updateCustomer(req, res) {
  try {
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
