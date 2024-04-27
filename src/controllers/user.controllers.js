import { pool } from "../db.js";

//OBTENER USUARIOS
export const getUsers = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM users");
  res.json(rows);
};

//OBTENER USUARIO
export const getUser = async (req, res) => {
  const { id } = req.params;

  const { rows } = await pool.query(`SELECT * FROM users WHERE id = ${id}`);

  if (rows.length === 0) {
    return res.status(404).json({ message: "user not found" });
  }
  res.json(rows[0]);
};

//AGREGAR USUARIO
export const createUser = async (req, res) => {
  try {
    const data = req.body;
    const { rows } = await pool.query(
      "INSERT INTO users (name, email) VALUES($1, $2) RETURNING *",
      [data.name, data.email]
    );

    return res.json(rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Email already exists" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

//DELETE USUARIO
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const { rowCount } = await pool.query(
    `DELETE FROM users WHERE id = ${id} RETURNING *`
  );

  if (rowCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.sendStatus(204);
};

//ACTUALIZAR USUARIO
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const { rows } = await pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    [data.name, data.email, id]
  );
  return res.json(rows)[0];
};
