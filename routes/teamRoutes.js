const express = require('express');
const mongoose = require('mongoose');
const Team = require('../models/team');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { teamName } = req.body;
        const convertedCase = teamName.toUpperCase();
        const teamExists = await Team.findOne({ teamName: convertedCase });
        if (teamExists) {
            return res.status(301).send({ message: "Team Already Exists...!!" })
        }

        const newTeam = {
            teamName: convertedCase
        };

        const team = await Team.create(newTeam);
        return res.status(201).json({ convertedCase });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
})

router.get('/', async (req, res) => {
    try {
        const teams = await Team.find({});
        return res.status(200).send(teams);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal Server Error" })
    }
})

router.get('/:teamName', async (req, res) => {
    try {
        const { teamName } = req.params;
        const team = await Team.findOne({ teamName });
        return res.status(200).send(team);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal Server Error...!!" });
    }
})

router.put('/:teamName', async (req, res) => {
    try {
        const { teamName } = req.params;
        const { score, time } = req.body;
        const team = await Team.findOneAndUpdate({ teamName }, { score, time });
        return res.status(200).send(team);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal Server Error...!!" });
    }
})


module.exports = router;