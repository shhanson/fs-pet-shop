'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const pets = require('./routes/pets');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 8000;

app.disable('x-powered-by');

app.use(morgan('short'));
app.use(bodyParser.json());

app.use(pets);

app.use((req, res) => {
    res.sendStatus(404);
});

app.listen(port, () =>{
    console.log("Listening on port", port);
});

module.exports = app;
