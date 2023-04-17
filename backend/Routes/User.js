const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const router = express.Router()
const jwtSecretKey = "TXLKhkT5x6wzbqv8QEuxgdxL9kjwLHAzjX8S3g983ms=";

router.post("/createUser", [
    body('name', 'Name must be at least 3 characters!').isLength({ min: 3 }),
    body('email', 'Please enter valid email address!').isEmail(),
    body('password', 'Password must be at least 8 characters!').isLength({ min: 8 }),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let salt = await bcrypt.genSalt(10);
    let securedPassword = await bcrypt.hash(req.body.password, salt);

    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) return res.status(400).json({ message: "User already exists." });

    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPassword,
            location: req.body.location,
        });
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});

router.post("/loginUser", [
    body('email', 'Please enter valid email address!').isEmail(),
    body('password', 'Password must be at least 8 characters!').isLength({ min: 8 }),
    ], 
    async (req, res) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;
        try {
            let userData = await User.findOne({email});

            if (!userData) {
                return res.status(400).json({ error: "Try logging with correct credentials!" });
            }

            const passwordCompare = await bcrypt.compare(req.body.password, userData.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: "Try logging with correct credentials!" });
            }

            const data = {
                user: {
                    id: userData.id
                }
            };
            const authToken = jwt.sign(data, jwtSecretKey);
            
            return res.json({ success: true, authToken });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    });

module.exports = router;
