import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT;

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(import.meta.dirname, "public")));


app.get("/", (req, res) => {
  res.render("index");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
