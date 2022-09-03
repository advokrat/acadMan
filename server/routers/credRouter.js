const express = require('express');

const {findUser} = require('../dao/userDAO.js');
const registerUser = require('../api/signup.js');
const {loginUser, authorization} = require('../api/login.js');

var router = express.Router();

router.post('/signup', registerUser);

router.post('/login', loginUser);

router.delete('/logout', authorization, (req, res) => {
    return res  
        .clearCookie("token")
        .status(200)
        .json({ message: "Logged out successfully"});
});

router.get('/getUserDetails', authorization, (req, res) => {
    const username = req.username;
    findUser(username)
    .then(result => {
        res.status(200).json({message: "User found successfully", user: result.elem});
    })
    .catch(error => {
        if(!error.elem) res.status(400).json({message: "No user found", user: error.elem});
    })
})

router.get('/welcome', authorization, (req, res) => {
    return res.status(200).json({ username: req.username });
})

module.exports = router;