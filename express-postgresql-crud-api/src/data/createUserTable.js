import { pool } from "../config/db.js";

export const createUserTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`;

  try {
    pool.query(queryText);
    console.log("User table created successfully if not exist.");
  } catch (error) {
    console.log(`Error creating user table: ${error}`);
  }
};
