import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getDiaryContents() {
  const result = await pool.query("SELECT * FROM diary_content");
  const rows = result[0];
  return rows;
}

export async function getDiaryContent(id) {
  const result = await pool.query(
    `
        SELECT * 
        FROM diary_content
        WHERE id = ?
        `,
    [id]
  );
  const row = result[0];
  return row;
}

export async function createDiaryContent(title, content_desc) {
  const [result] = await pool.query(
    `
        INSERT INTO diary_content(title, content_desc)
        VALUES(?,?)
        `,
    [title, content_desc]
  );
  const id = result.insertId;
  return getDiaryContent(id);
}

// console.log( await getDiaryContents());
