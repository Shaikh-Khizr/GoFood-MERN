const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

router.post("/createUser", [
    body('name', 'Name must be at least 3 characters!').isLength({ min: 3 }),
    body('email', 'Please enter valid email address!').isEmail(),
    body('password', 'Password must be at least 8 characters!').isLength({ min: 8 }),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            location: req.body.location,
        });
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});

module.exports = router;
