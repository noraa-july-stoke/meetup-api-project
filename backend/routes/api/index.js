const router = require('express').Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');

// This should be before any other route handlers or middleware
router.use(restoreUser);







module.exports = router;
