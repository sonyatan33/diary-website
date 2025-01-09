import express from "express";
import {
  getDiaryContents,
  getDiaryContent,
  createDiaryContent,
  deleteDiaryContent,
  updateDiaryContent,
} from "./database.js";

import methodOverride from "method-override";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.set("view engine", "ejs");

app.use(express.static("public"));

//get all diary
app.get("/diary", async (req, res) => {
  const diaryContents = await getDiaryContents();
  res.render("index.ejs", { diaryContents });
});

//get a single diary entry
app.get("/diary/:id", async (req, res) => {
  const id = +req.params.id;
  const diaryContent = await getDiaryContent(id);
  const imageBuffer = diaryContent[0].blob_img;
  // const image = imageBuffer.toString("base64");

  if (!diaryContent[0]) {
    res.status(404).render("diary404.ejs");
    return;
  } else {
  }
  // res.send(image);
  res.render("singleDiary.ejs", { diaryContent, image: imageBuffer });
});

//create a new diary entry
app.post("/diary", async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const imageBuffer = req.files.image.data;
  // const image = req.files.image;
  // res.send(imageBuffer);
  await createDiaryContent(title, content, imageBuffer);
  res.redirect("/diary");
});

app.post("/diary/:id/delete", async (req, res) => {
  const id = +req.params.id;
  await deleteDiaryContent(id);
  // console.log(await getDiaryContents());
  res.redirect("/diary");
});

//to create update fields for the data in another page
app.get("/diary/:id/edit", async (req, res) => {
  const id = +req.params.id;
  const diaryContent = await getDiaryContent(id);
  // res.send(diaryContent);
  if (!diaryContent[0]) {
    res.status(404).render("diary404.ejs");
    return;
  } else {
  }
  res.render("updateDiary.ejs", { diaryContent });
});

//update data using a post req (put req wont work...)
app.put("/diary/:id/update", async (req, res) => {
  const id = +req.params.id;
  const title = req.body.title;
  const content = req.body.content;
  const imageBuffer = req.files.image.data;

  await updateDiaryContent(id, title, content, imageBuffer);
  res.redirect("/diary/" + id);
});

//check if there is any error with our code
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

//passing port 5500 to server to enable us to use localhost
app.listen(5500, () => {
  console.log("Server is running on port 5500");
});
