const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const userStrategy = require('../strategies/user.strategy');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user);
    const userLevel = req.user.clearance_level
   const queryString = `SELECT * FROM "secret" WHERE ${userLevel} >= "secret".secrecy_level;`;
    pool.query(queryString)
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for secrets:', error);
            res.sendStatus(500);
        });
});

module.exports = router;