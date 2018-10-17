const express = require('express')
const router = express.Router()
const sequelize = require('../db')
const User = sequelize.import('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validateSession = require('../middleware/validate-session')

/* CREATE USER */
router.post('/createuser', function (req, res) {
    let username = req.body.user.username
    let pass = req.body.user.password
    
    User.create({
        username: username,
        passwordhash: bcrypt.hashSync(pass, 10)
    })
    .then(
        function createSuccess(user) {
           let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'});
            
            res.json({
                user: user,
                message: "created",
                sessionToken: token
            })
        },
        function createError(err) {
            res.send(500, err.message)
        }
    )
});

/* SIGN IN */
router.post('/signin', function(req, res){
    User.findOne( { where: { username: req.body.user.username } } ).then(
        function(user) {
            if (user) {
                bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches) {
                    if (matches) {
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
                        
                        res.json({
                            user: user,
                            message: "Successfully authenticated",
                            sessionToken: token
                        })
                    } else {
                        res.status(502).send({ error: "Username or Password is invalid."})
                    }
                })
            } else {
                res.status(500).send({ error: "You failed to authenticate." });
            }
        },
        function(err) {
            res.status(501).send({error: "Login failed. Please try again."})
        }
    )
});

/* FETCH ME */
router.get('/me', validateSession, function(req, res) {
    if (!req.user) {
        return res.sendStatus(401);
    }
    
    return res.status(200).json(req.user)
})

module.exports = router;