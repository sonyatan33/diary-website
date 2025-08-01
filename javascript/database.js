import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "Flower123!",
    database: "diary_website_db",
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

export async function createDiaryContent(title, content_desc, blob_img) {
  const [result] = await pool.query(
    `
        INSERT INTO diary_content(title, content_desc, blob_img)
        VALUES(?,?, ?)
        `,
    [title, content_desc, blob_img]
  );
  const id = result.insertId;
  return getDiaryContent(id);
}

export async function deleteDiaryContent(id) {
  await pool.query(
    `
        DELETE 
        FROM diary_content
        WHERE id = ?
        `,
    [id]
  );
  return;
}

export async function updateDiaryContent(id, title, content_desc, blob_img) {
  await pool.query(
    `
        UPDATE diary_content
        SET
        ?,
        ?,
        ?
        WHERE id = ${id}
        `,
    [{ title: title }, { content_desc: content_desc }, {blob_img: blob_img}]
  );
  return;
}
