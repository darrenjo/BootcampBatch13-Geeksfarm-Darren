import express from "express";
import pool from "./config/db.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();
const port = process.env.PORT;

app.get("/addasync", async (req, res) => {
  try {
    const name = "tono";
    const email = "tono@mail.com";
    const phone = "08151462";
    const newCont = await pool.query(
      `INSERT INTO contacts values ('${name}','${email}','${phone}') RETURNING *`
    );
    res.json(newCont);
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on Port ${port}`);
});
