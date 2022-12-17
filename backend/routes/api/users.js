//----------------------------------------------------------
//--------------------| USERS.JS |--------------------------
//----------------------------------------------------------


//|Imports/Variable Definitions| ---------------------------

const express = require('express');
const  { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();


//|Route Handlers/Routers/Intra-Route Middleware| ----------

//|Signup route| -------------------------------------------
router.post('/', async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    // utility function adds jwt token to response object
    await setTokenCookie(res, user)

    return res.json({user});
});




module.exports = router;
