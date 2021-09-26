const {TestUser} = require("../db/models");

async function getByUUID(req, res, next) {
    var uuid = req.params.uuid
    
    try {
        const tUser = await TestUser.findOne({
            where: {
                uuid: uuid
            }
        });

        return res.json(tUser);
    } catch(error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

async function getAll(req, res, next) {
    try {
        const tUsers = await TestUser.findAll();

        return res.json(tUsers);
    } catch(error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

async function post(req, res, next) {
    const {name, email, role} = req.body

    try {
        const tUser = await TestUser.create({
            name,
            email,
            role
        })

        return res.json(tUser);
    } catch(error) {
        console.log("=== error occurred ===");
        console.log(error);
        return res.status(500).json(error);
    }
}

module.exports = {
    getByUUID, getByUUID,
    getTestUsers: getAll,
    postTestUser: post,
}