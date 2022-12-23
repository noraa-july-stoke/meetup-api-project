//----------------------------------------------------------
//--------------------| GROUPS.JS |--------------------------
//----------------------------------------------------------

const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Group, Sequelize, GroupImage, Membership, Attendance, EventImage, Venue } = require('../../db/models');
const { application } = require('express');
const { Op } = require('sequelize');
const router = express.Router();

//|Middleware Definitions| ---------------------------------


//|Route Handlers/Routers/Intra-Route Middleware| ----------


//|Get All Groups| -------------------------------------------

router.get('/', async (req, res) => {
    let groups  = [];
    //Eager load, skip N+1 query.
    const groupsData = await Group.findAll({
        include: [
            {
                model: GroupImage,
                where: {preview: true},
                attributes: ['url']
            },
            {
                model: Membership
            }
        ]
    });

    for (let group of groupsData) {

        group = group.toJSON();

        const numMembers = group.Memberships.length;
        group.numMembers = numMembers;
        delete group.Memberships;

        const url = group.GroupImages[0].url;
        group.previewImage = url;
        delete group.GroupImages;

        groups.push(group);
    }

    res.json({Groups:[...groups]});
});



//|Get Group From Id| -------------------------------------------


router.get('/:groupId', async (req, res) => {
    const id = +req.params.groupId;
    let group = await Group.findOne({
        where: {id},
        include: [
            {model: GroupImage},
            {model: User},
            {model: Venue},
            {model: Membership}
        ]
    });

    group = group.toJSON();
    group.numMembers = group.Memberships.length;
    delete group.Memberships;
    group.Organizer = group.User;
    delete group.User;

    //const group = Group.findByPk();
    res.json(group)
});

router.post('/', requireAuth, async (req, res) => {
    const { name, about, type, private, city, state } = req.body;
    const groupData = { name, about, type, private, city, state };
    groupData.organizerId = req.user.id;


    const newGroup = Group.build(groupData);

    await newGroup.save();

    res.json(newGroup);

});

module.exports = router;
