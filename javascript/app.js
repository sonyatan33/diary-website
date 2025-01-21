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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.set("view engine", "ejs");
app.use(express.static("public"));

//more about what blog website is about
app.get("/about_blog", async (req, res) => {
  res.render("aboutBlog.ejs");
});

//get all blogs
app.get("/blog", async (req, res) => {
  const diaryContents = await getDiaryContents();
  res.render("mainBlog.ejs", { diaryContents });
});
//get personal blog
app.get("/my_blog", async (req, res) => {
  const diaryContents = await getDiaryContents();
  res.render("myBlog.ejs", { diaryContents });
});

//create new blog page
app.get("/new_blog", (req, res) => {
  res.render("createBlog.ejs");
});

//create a new blog entry
app.post("/blog", async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const imageBuffer = req.files.image.data;
  // const image = req.files.image;
  // res.send(imageBuffer);
  await createDiaryContent(title, content, imageBuffer);
  res.redirect("/blog");
});

//get a single blog entry
app.get("/blog/:id", async (req, res) => {
  const id = +req.params.id;
  const diaryContent = await getDiaryContent(id);
  const imageBuffer = diaryContent[0].blob_img;
  // const image = imageBuffer.toString("base64");

  if (!diaryContent[0]) {
    res.status(404).render("blog404.ejs");
    return;
  } else {
  }
  res.render("singleBlog.ejs", { diaryContent, image: imageBuffer });
});

//edit blog page
app.get("/my_blog/:id/edit", async (req, res) => {
  const id = +req.params.id;
  const diaryContent = await getDiaryContent(id);
  if (!diaryContent[0]) {
    res.status(404).render("blog404.ejs");
    return;
  } else {
  }
  res.render("updateBlog.ejs", { diaryContent });
});

//update data using a put req
app.put("/blog/:id/update", async (req, res) => {
  const id = +req.params.id;
  const title = req.body.title;
  const content = req.body.content;
  const imageBuffer = req.files.image.data;

  await updateDiaryContent(id, title, content, imageBuffer);
  res.redirect("/blog/" + id);
});

//delete a blog entry
app.post("/my_blog/:id/delete", async (req, res) => {
  const id = +req.params.id;
  await deleteDiaryContent(id);
  res.redirect("/my_blog");
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
