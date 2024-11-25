import express from "express"
import {
  getDiaryContents,
  getDiaryContent,
  createDiaryContent,
} from "./database.js"

const app = express();
app.use(express.json());

app.get("/diary", async (req, res) => {
  const diaryContents = await getDiaryContents();
  res.send(diaryContents);
});

app.get("/diary/:id", async (req, res) => {
  const id = req.params.id;
  const diaryContent = await getDiaryContent(id);
  res.send(diaryContent);
});

app.post("/diary", async (req, res) => {
  const { title, content_desc } = req.body;
  const createDiary = await createDiaryContent(title, content_desc);
  res.status(201).send(createDiary);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(5500, () => {
  console.log("Server is running on port 5500");
});
