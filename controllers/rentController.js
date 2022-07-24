import db from "../config/db.js";
export async function getRents(req, res) {
  const { customerId, gameId } = req.query;
  try {
    let params = [];
    let whereText = "";
    let whereArray = [];
    if (customerId) {
      params.push(customerId);
      whereArray.push(`rentals."customerId" = $${params.length}`);
    }
    if (gameId) {
      params.push(gameId);
      whereArray.push(`rentals."gameId"= $${params.length}`);
    }
    if (params.length > 0) {
      whereText += `Where ${whereArray.join(" AND ")}`;
    }
    const result = await db.query(
      {
        text: `
      SELECT
        rentals.*,
        customers.name AS customer,
        games.name,
        categories.*
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
    let finalObject = result.rows.map(formatFinalOBject);
    res.send(finalObject);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
export async function createRent(req, res) {
  const rental = req.body;
  try {
    const validCustomer = await db.query(
      `
    SELECT id FROM customers WHERE id =$1`,
      [rental.customerId]
    );
    if (validCustomer.rows.length === 0) {
      return res.sendStatus(400);
    }
    const validGame = await db.query(
      `
    SELECT * FROM games WHERE id = $1`,
      [rental.gameId]
    );
    console.log(validGame.rows);
    if (validGame.rows.length === 0) {
      return res.sendStatus(400);
    }
    const game = validGame.rows[0];
    const result = await db.query(
      `
    SELECT id
    FROM rentals
    WHERE "gameId"= $1 AND "returnDate" is null
    `,
      [rental.gameID]
    );
    if (result.rows.length > 0) {
      if (game.stockTotal === result.rows.length) {
        return res.sendStatus(400);
      }
    }

    const originalPrice = rental.daysRented * game.pricePerDay;

    await db.query(
      `
    INSERT INTO
    rentals (
      "customerId", 
      "gameId", 
      "rentDate", 
      "daysRented", 
      "returnDate", 
      "originalPrice", 
      "delayFee"
    )
    VALUES ($1, $2, NOW(), $3, null, $4, null)
    `,
      [rental.customerId, rental.gameId, rental.daysRented, originalPrice]
    );
    res.sendStatus(201);
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

function formatFinalOBject(row) {
  const [
    id,
    customerId,
    gameId,
    rentDate,
    daysRented,
    returnDate,
    originalPrice,
    delayFee,
    customerName,
    gameName,
    categoryId,
    categoryName,
  ] = row;

  return {
    id,
    customerId,
    gameId,
    rentDate,
    daysRented,
    returnDate,
    originalPrice,
    delayFee,
    customer: {
      id: customerId,
      name: customerName,
    },
    game: {
      id: gameId,
      name: gameName,
      categoryId,
      categoryName,
    },
  };
}
