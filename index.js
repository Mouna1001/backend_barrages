const express = require('express');
const cors = require('cors');

require('dotenv').config();
routeAPI=require('./route');
selectAPI=require('./select');
queryAPI=require('./query');

const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// CORS implemented so that we don't get errors when trying to access the server from a different server location

app.use('/route',routeAPI);
app.use('/select',selectAPI);
app.use('/query',queryAPI);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}, http://localhost:${port}`));

