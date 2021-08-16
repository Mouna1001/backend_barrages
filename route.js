const express = require("express");
const router = express.Router();
const knex = require("knex");

const db = knex({
    client: "pg",
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
    },
});

router.get("/", (req, res) => {
    db.select("*")
        .from("barraget")
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;