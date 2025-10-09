import { pool } from "../config/db.js";

export const getAllUsersService = async () => {
  const result = await pool.query("SELECT * FROM users");

  return result.rows;
};

export const getUserByIdService = async (id) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

  return result.rows;
};

export const createUserService = async (email, name, password) => {
  const result = await pool.query(
    "INSERT INTO users (email,  name, password) VALUES ($1, $2, $3) RETURNING *",
    [email, name, password]
  );

  return result.rows;
};

export const updateUserService = async (id, email, name, password) => {
  const result = await pool.query(
    "UPDATE users SET email = $1, name = $2 , password = $3 WHERE id = $4 RETURNING *",
    [email, name, password, id]
  );

  return result.rows;
};

export const deleteUserService = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows;
};
