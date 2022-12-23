//----------------------------------------------------------
//--------------------| USERS.JS |--------------------------
//----------------------------------------------------------


//|Imports/Variable Definitions| ---------------------------

const express = require('express');
const  { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors, validateSignup } = require('../../utils/validation');
const { User } = require('../../db/models');
const router = express.Router();
const validator = require('validator')
//|Route Handlers/Routers/Intra-Route Middleware| ----------


//|Signup route| -------------------------------------------
router.post('/', validateSignup, async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    const err = new Error()
    err.message = "Validation error";
    err.errors = {};
    if (!firstName) err.errors.firstName = "First Name is required";
    if (!lastName) err.errors.lastName = "Last Name is required";
    if (!validator.isEmail(email)) err.errors.email = "Invalid email"
    if (Object.keys(err.errors).length) {
        return res.status(400).send(err);
    }

    const user = await User.signup({ firstName, lastName, email, username, password });

    if (!user) return res.status(400).send({
        "message": "User already exists",
        "statusCode": 403,
        "errors": {
            "email": "User with that email already exists"
        }
    });

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
