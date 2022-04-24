const express = require("express");
const fs = require("fs");
const notes = require("./db/db.json");
const path = require("path");
// const { saveNote } = require("./db/noteFunctions");
var uuidv1 = require("uuidv1");
// console.log(uuidv1())

const PORT = process.env.PORT || 3001;
const app = express();

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// API routes
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  const savedNote = fs.readFileSync(path.join(__dirname, "./db/db.json"));
  const parseNote = JSON.parse(savedNote);
  res.json(parseNote);
});

app.post("/api/notes", (req, res) => {
  const savedNote = fs.readFileSync(path.join(__dirname, "./db/db.json"));
  const parseNote = JSON.parse(savedNote);
  console.log(req.body);
  req.body.id = uuidv1();
  parseNote.push(req.body);

  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(parseNote, null, 2)
  );
  res.json(notes);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
