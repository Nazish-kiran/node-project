import express from "express";
import path from "path";
import fs from "fs";
import { log } from "console";

const app = express();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(import.meta.dirname, "public")));

app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    console.log(files);
    res.render("index", { files: files });
  });
});
app.post("/create", (req, res) => {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    (err) => {
      res.redirect("/");
    }
  );
  console.log(req.body);
});
app.get("/file/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, fileData) => {
    res.render("show", {
      showData: fileData,
      showName: req.params.filename.replace(".txt", ""),
    });
  });
});
app.get("/edit/:filename", (req, res) => {
  res.render("edit", { oldName: req.params.filename.replace(".txt", "") });
});
app.post("/edit", (req, res) => {
  fs.rename(
    `./files/${req.body.previous}.txt`,
    `./files/${req.body.new}.txt`,
    (err) => {
      res.redirect("/");
    }
  );
  console.log(req.body);
});
app.get("/delete/:filename", (req, res) => {
  fs.unlink(`./files/${req.params.filename}`, (err) => {
    res.redirect("/");
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
