import usersService from "./users.service.js";

async function create(req, res) {}

async function findOne(req, res) {
    const { user_id } = req.params;
    const { user } = await usersService.findOne(user_id);
    res.status(200).json(user);
}

async function getProfile(req, res) {
    const { user_id } = req.user;
    const { user } = await usersService.findOne(user_id);
    res.status(200).json(user);
}

async function findAll(req, res) {}

async function update(req, res) {
    console.log(req.user);
    res.status(200).json({ message: "updated successfully" });
}
async function remove(req, res) {}

export default {
    create,
    findOne,
    getProfile,
    findAll,
    update,
    remove,
};
