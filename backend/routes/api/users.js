//----------------------------------------------------------
//--------------------| USERS.JS |--------------------------
//----------------------------------------------------------


//|Imports/Variable Definitions| ---------------------------

const express = require('express');
const  { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const router = express.Router();


//|Middleware Definitions| ---------------------------------

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];


//|Route Handlers/Routers/Intra-Route Middleware| ----------


//|Signup route| -------------------------------------------
router.post('/', validateSignup, async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    const user = await User.signup({ firstName, lastName, email, username, password });

    // utility function adds jwt token to response object
    await setTokenCookie(res, user)

    return res.json({
        user:{
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userName: user.username
        }
    });
});




module.exports = router;
