const express = require("express");
const app = express();
const pg = require("pg");
const PORT = 3000;
const client = new pg.Client(
  process.env.DATABASE_URL ||
    "postgres://Torsk:wordpass@localhost:5432/employees"
);

// create your init function
const init = async () => {
  try {
    await client.connect();
    const SQL = `
    DROP TABLE IF EXISTS people;
    CREATE TABLE people( id SERIAL PRIMARY KEY, name VARCHAR(50), is_admin BOOLEAN DEFAULT FALSE);
    INSERT INTO people (name, is_admin) VALUES ('Chloe', true);
    INSERT INTO people (name) VALUES ('Nugi');
`;
    await client.query(SQL);
    await client.end();
    console.log("The database is seeded");
  } catch (error) {
    console.error(error);
  }
};
// init function invocation
init();
