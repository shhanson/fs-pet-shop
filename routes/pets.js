'use strict';
const fs = require('fs');
const path = require('path');
const FILEPATH = path.join(__dirname, '../pets.json');
const express = require('express');
const router = express.Router();

router.get('/pets', (req, res) => {
    fs.readFile(FILEPATH, 'utf8', (err, petData) => {
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }

        let petDataObj = JSON.parse(petData);
        res.send(petDataObj);

    });
});

router.get('/pets/:id', (req, res) => {
    fs.readFile(FILEPATH, 'utf8', (err, petData) => {
        if (err) {
            console.error(err.stack);
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

router.post('/pets', (req, res) => {

    fs.readFile(FILEPATH, 'utf8', (err, petData) => {
        if (err) {
            console.error(err.stack);
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
                    console.error(err.stack);
                    return res.sendStatus(500);
                }
            });
            res.send(pet);
        } else {
            res.sendStatus(400);
        }

    });
});

router.patch('/pets/:id', (req, res) => {
    fs.readFile(FILEPATH, 'utf8', (err, petData) => {
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }

        let petDataObj = JSON.parse(petData);

        let id = parseInt(req.params.id);

        if (id < 0 || id >= petDataObj.length || Number.isNaN(id)) {
            return res.sendStatus(404);
        }

        if (req.body.age && !Number.isNaN(req.body.age)) {
            petDataObj[id].age = req.body.age;
        }

        if (req.body.kind) {
            petDataObj[id].kind = req.body.kind;
        }

        if (req.body.name) {
            petDataObj[id].name = req.body.name;
        }

        fs.writeFile(FILEPATH, JSON.stringify(petDataObj), (err) => {
            if (err) {
                console.error(err.stack);
                return res.sendStatus(500);
            }
        });
        res.send(petDataObj[id]);

    });
});

router.delete('/pets/:id', (req, res) => {
    fs.readFile(FILEPATH, (err, petData) => {
        if (err) {
            console.error(err.stack);
            return res.sendStatus(500);
        }

        let petDataObj = JSON.parse(petData);
        let id = parseInt(req.params.id);

        if (id < 0 || id >= petDataObj.length || Number.isNaN(id)) {
            return res.sendStatus(404);
        }

        let removedPet = petDataObj.splice(id, 1)[0];
        let updatedPets = JSON.stringify(petDataObj);

        fs.writeFile(FILEPATH, updatedPets, (err) => {
            if (err) {
                console.error(err.stack);
                return res.sendStatus(500);
            }

            res.send(removedPet);
        });


    });
});



module.exports = router;
