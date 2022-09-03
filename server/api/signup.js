const bcrypt = require("bcryptjs");
const {addUser} = require("../dao/userDAO.js");

function registerUser(req, res) { // validating the username not done yet (username should be there in the list of registered iitk usernames)
    const  username = req.body.username,
           rollNo = req.body.rollNo,
           name = req.body.name,
           password = req.body.password;
           department = req.body.department;
					// department = 'EE';

    if(!username || !rollNo || !name || !password || !department ) return res.status(400).json({message: "Please fill all the fields"});
    if(password.length == 0) return res.status(400).json({message: "Password should have a finite length"});
    /*
    bcrypt.hash(password, 10, (err, hash) => {
        if(!err) hashPassword = hash;
        else console.log(err);
    });
    */

    const hashPassword = bcrypt.hashSync(password, 10);

    addUser(username, rollNo, name, hashPassword, department)
    .then( result => {
        res.status(result.status).json({ message: result.message });
    })
    .catch( error => {
        res.status(error.status).json({ message: error.message });
    });
}

module.exports = registerUser;