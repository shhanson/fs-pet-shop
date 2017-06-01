const bp = require('body-parser');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const FILEPATH = path.join(__dirname, 'pets.json');
const port = 3000;

app.use(bp.json()); // support json encoded bodies
app.use(bp.urlencoded({
    extended: true
})); // support encoded bodies

app.get('/pets', (req, res) => {
    fs.readFile(FILEPATH, 'utf8', (err, petData) => {
        if (err) {
            console.err(err.stack);
            return res.sendStatus(500);
        }

        let petDataObj = JSON.parse(petData);
        res.send(petDataObj);

    });
});

app.get('/pets/:id', (req, res) => {
    fs.readFile(FILEPATH, 'utf8', (err, petData) => {
        if (err) {
            console.err(err.stack);
            return res.sendStatus(500);
        }

        let petDataObj = JSON.parse(petData);
        let id = parseInt(req.params.id);

        if (id < 0 || id >= petDataObj.length || Number.isNaN(id)) {
            return res.sendStatus(404);
        }

        res.send(petDataObj[id]);

    });

});

app.post('/pets', (req, res) => {

    fs.readFile(FILEPATH, 'utf8', (err, petData) => {
        if (err) {
            console.err(err.stack);
            return res.sendStatus(500);
        }

        let petDataObj = JSON.parse(petData);

        if (req.body.age && !Number.isNaN(req.body.age) && req.body.kind && req.body.name) {

            let pet = {
                age: Number(req.body.age),
                kind: req.body.kind,
                name: req.body.name,
            };

            petDataObj.push(pet);
            fs.writeFile(FILEPATH, JSON.stringify(petDataObj), (err) => {
                if (err) {
                    console.err(err.stack);
                    return res.sendStatus(500);
                }
            });
            res.send(pet);
        } else {
            res.sendStatus(400);
        }

    });
});

app.use((req, res) => {
    res.sendStatus(404);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

module.exports = app;
