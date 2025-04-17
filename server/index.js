// imports here for express and pg
const express = require("express");
const app = express();
const pg = require("pg");
const PORT = 3000;
const client = new pg.Client(
  process.env.DATABASE_URL ||
    "postgres://Torsk:wordpass@localhost:5432/employees"
);
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(require("morgan")("dev"));

// static routes here (you only need these for deployment)
app.use(cors());
app.listen(PORT, () => {
  console.log(`I am listening on port number ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Does this work");
});
// app routes here
app.get("/employees", async (req, res) => {
  try {
    const SQL = `
          SELECT * FROM people;
      `;
    const response = await client.query(SQL);
    res.status(200).send(response.rows);
  } catch (error) {
    res.status(400).send("Something didn't work");
  }
});
const init = async (req, res) => {
  try {
    await client.connect();
  } catch (error) {
    console.error(error);
  }
};

init();
