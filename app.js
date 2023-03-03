const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.text());
app.use(express.json());

let db = [
  {
    id: Math.floor(Math.random() * 100000),
    name: "Goku",
    poder: "kamehameha",
  },
  {
    id: Math.floor(Math.random() * 1000000),
    name: "Vegeta",
    poder: "Bigbang",
  },
];

app.get("/", (req, res) => {
  res.send(db);
});

app.get("/:id", (req, res) => {
  const { id } = req.params;
  let guerreroZFind = db.find((item) => item.id === parseInt(id));
  res.send(guerreroZFind);
});

app.post("/", (req, res) => {
  console.log(req.body);
  let { id = Math.floor(Math.random() * 1000000), name, poder } = req.body;
  db.push({ id, name, poder });
  res.send("Guerrero Z creado");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
