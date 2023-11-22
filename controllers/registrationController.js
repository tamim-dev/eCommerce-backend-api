const {
    emailValidation,
    passwordValidation,
} = require("../helpers/validation");
let User = require("../model/userSchema");
const bcrypt = require('bcrypt');

let registrationController = async (req, res) => {
    let { name, email, password } = req.body;

    let existingUser = await User.find({ email: email });

    if (existingUser.length == 0) {
        if (!name) {
            res.send("Name required");
        } else if (!email) {
            res.send("Email required");
        } else if (!password) {
            res.send("Password required");
        } else {
            if (email) {
                if (!emailValidation(email)) {
                    return res.send("Valid Email Required");
                }
            }
            if (password) {
                if (!passwordValidation(password)) {
                    return res.send(
                        "Enter an password 8 characters includes letter and number"
                    );
                }
            }

            bcrypt.hash(password, 10, function (err, hash) {
                let user = new User({
                    name: name,
                    email: email,
                    password: hash,
                });
    
                user.save();
    
                res.send(user);
            });

            
        }
    } else {
        res.send("Already email exits");
    }
};

module.exports = registrationController;
