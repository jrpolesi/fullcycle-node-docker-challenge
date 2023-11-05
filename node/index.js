const mysql = require("mysql");
const { faker } = require("@faker-js/faker");
const { promisify } = require("util");
const express = require("express");
const app = express();

const PORT = 3000;

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

async function insertName(name) {
  const conn = mysql.createConnection(config);
  const query = promisify(conn.query).bind(conn);

  const sql = `INSERT INTO people(name) values(?)`;
  await query(sql, [name]);

  conn.end();
}

async function getPeople() {
  const conn = mysql.createConnection(config);
  const query = promisify(conn.query).bind(conn);

  const sql = "SELECT * FROM `people`";
  const people = await query(sql);

  conn.end();

  return people;
}

app.get("/", async (_, res) => {
  const randomName = faker.person.fullName();
  await insertName(randomName);

  const people = (await getPeople()) ?? [];

  const html = `
  <h1>Full Cycle Rocks!</h1>

  <ul>
   ${people.map(({ name }) => `<li>${name}</li>`).join("")}
  </ul>
  `;

  res.send(html);
});

app.listen(PORT, () => {
  console.log("Server running in port " + PORT);
});
