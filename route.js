const express = require('express');
const router = express.Router();
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE
    },
});

router.get('/', (req, res) => {
    //db.raw('select *, EXTRACT(YEAR from date) as year from barrages where EXTRACT(YEAR from date) IN (2020, 2021);')
   //db.raw('select distinct * from barrage2 ;') 
    //db.raw('select sum(fill_rate) as fill_rate, name, EXTRACT(year from date) as year from barrages  group by name, EXTRACT(YEAR from date);')
     db.select('*')
           .from('barrage2')
                   
            .then((data) => {
            console.log(data);
            //res.json(data);
            res.send(data)
        })
        .catch((err) => {
            console.log(err);
        });
            
});


module.exports = router;