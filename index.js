const express = require('express');
const Knex = require('knex');
const app = express();
const { Model } = require('objection');
const knexconfig = require('./knexfile');
const bodyparser = require("body-parser");
const routes = require('./routes/route');

//initialization
const knex = Knex(knexconfig["development"])
Model.knex(knex);

app.use(bodyparser.json());
app.use(express.json());

// routes
app.use("/api",routes);

app.listen(3000, () => {
    console.log("Server is running on port : 3000");
})