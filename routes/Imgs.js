const express = require('express');
const Imgs = require('../model/Img');
const imgs = express.Router();

imgs.get('/', async (req, res) => {
    const reuslt = await Imgs.findAll();
    // console.log(reuslt);
    res.send(reuslt);
});

module.exports = imgs;