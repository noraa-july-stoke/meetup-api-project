//----------------------------------------------------------
//--------------------| GROUPS.JS |--------------------------
//----------------------------------------------------------

const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Group, sequelize, GroupImage, Membership, Models } = require('../../db/models');
const { application } = require('express');
const { Op } = require('sequelize');
const router = express.Router();

//|Middleware Definitions| ---------------------------------


//|Route Handlers/Routers/Intra-Route Middleware| ----------


//|Get All Groups| -------------------------------------------

router.get('/', async (req, res) => {
    const groups = await Group.findAll();
    for (let group of groups) {
        group = group.toJSON();
        // const members = await Membership.findAll({
        //     where: {groupId: group.id}
        // })
        // console.log(members[0].toJSON())
        const groupImg = await GroupImage.findOne({
            where: {preview: true}
        });
        console.log(groupImg)
    }
    res.json(groups);
});

module.exports = router;
