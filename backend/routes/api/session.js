//----------------------------------------------------------
// Imports/Variable Definitions
//----------------------------------------------------------
const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//|Middleware Definitions|-----------------------------------

//Check function checks specified key, chained methods tell it
//specifically what to check for with passed in options object
const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

//----------------------------------------------------------
//Route Handlers/Routers/Intra-Route Middleware
//----------------------------------------------------------

//|Get Session User Route| ---------------------------------
router.get('/', restoreUser, async (req, res) => {
    const { user } = req;
    if (user) {
        return res.json({
            user: user.toSafeObject()
        });
    } else return res.json({ user: null })
});



//|Login route| --------------------------------------------
router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid'];
        return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userName: user.username
        }
    });
});

//|Logout route| ---------------------------------------------
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' })
});

module.exports = router;
