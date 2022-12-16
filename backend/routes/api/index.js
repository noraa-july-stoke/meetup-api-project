//----------------------------------------------------------
// Imports/Variable Definitions
//----------------------------------------------------------
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

//----------------------------------------------------------
// Pre-Route Middleware
//----------------------------------------------------------


// This should be before any other route handlers or middleware
router.use(restoreUser);



//----------------------------------------------------------
//Route Handlers/Routers/Intra-Route Middleware
//----------------------------------------------------------
router.use('/session', sessionRouter);
router.use('/users', usersRouter);

router.post('/test', (req, res) => {
    res.json({requestBody: req.body});
});


module.exports = router;
