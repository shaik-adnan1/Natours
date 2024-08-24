const express = require('express');

const router = express.Router();


router
    .route('/')
    .get((req, res) => {
        console.lof("Hey Route Working")
        res.json("Route Working")
    })