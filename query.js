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
    db.raw('select avg(reserve) as reserve,avg(fill_rate) as fill_rate, name, EXTRACT(year from date) as year ,EXTRACT(month from date) as month from barraget where EXTRACT(YEAR from date) = ' + req.query.year + ' and EXTRACT(month from date) = ' + req.query.month + ' group by name, EXTRACT(YEAR from date),EXTRACT(month from date) ;')
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            console.log(err);
        });

});
router.post('/saveWeather', (req, res) => {
    for (let i = 0; i < req.body.temp.length; i++) {
        db.raw('INSERT INTO weather (city,temperature,wind,pression,humidity,date) VALUES (\'' + req.body.temp[5] + '\',' + req.body.temp[i].main.temp + ',' + req.body.temp[i].wind.speed + ',' + req.body.temp[i].main.pressure + ',' + req.body.temp[i].main.humidity + ',\'' + req.body.temp[i].dt_txt + '\');')
            .then((data) => {
                // do nothing
            })
            .catch((err) => {
                console.log('err', err);
            });
    }
})
module.exports = router;