import usersService from "./users.service.js";
import rolesRepository from "../rbac/roles.repository.js";

async function create(req, res) {
    const dto = req.body;
    const user = await usersService.create(dto);

    res.status(201).json(user);
}

async function findOne(req, res) {
    const { user_id } = req.params;
    const user = await usersService.findOne(user_id);
    res.status(200).json(user);
}

async function findAll(req, res) {
    const query = req.query;
    const users = await usersService.findAll(query);
    res.status(200).json(users);
}

async function update(req, res) {
    const { user_id } = req.params;
    const dto = req.body;

    await usersService.update(user_id, dto);

    res.status(200).json({ message: "updated successfully" });
}
async function deleteUser(req, res) {
    const { user_id } = req.params;
    await usersService.deleteUser(user_id);
    res.status(200).json({ message: "deleted successfully" });
}

async function findAvailableRoles(req, res) {
    const roles = await rolesRepository.findAllRole();
    res.json(roles);
}

async function addRole(req, res) {
    const { user_id } = req.params;
    const { role_id } = req.body;

    await usersService.addRole(user_id, role_id);

    res.json({ message: "role updated successfully" });
}

async function removeRole(req, res) {
    // after removing role assign default Unassigned role
}

export default {
    create,
    findOne,
    findAll,
    update,
    deleteUser,
    findAvailableRoles,
    addRole,
    removeRole
};
