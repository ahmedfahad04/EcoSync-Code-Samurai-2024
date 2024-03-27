import { models } from "../../configs/mysql.js";
import { HttpError } from "../../utils/HttpError.js";
import { RoleTypes } from "../../models/Role.js";
import usersRepository from "../users/users.repository.js";

async function createLanfill(req, res) {
    const landfillDto = req.body;

    const exilandfill = await models.Landfill.findOne({ where: { landfill_name: landfillDto.landfill_name } });
    if (exilandfill) throw new HttpError({ landfill_name: "landfill already exilandfill" });

    let newLandfill = await models.Landfill.create({ ...landfillDto, gps_coordinate: JSON.stringify(landfillDto.gps_coordinate) });
    newLandfill = newLandfill.toJSON();
    newLandfill.gps_coordinate = landfillDto.gps_coordinate;

    res.status(201).json(newLandfill);
}

async function updateLanfill(req, res) {}

async function addManager(req, res) {
    const { landfill_id } = req.params;
    const { manager_id } = req.body;

    // user cannot be manager of multiple landfill
    const alreadyManagerOfAnyLandfill = await models.UserLandfill_Manager.findOne({ where: { user_id: manager_id } });
    if (alreadyManagerOfAnyLandfill) throw new HttpError({ manager_id: "already assigned to landfill" });

    const landfill = await models.Landfill.findByPk(landfill_id);

    if (!landfill) throw new HttpError({ message: "landfill not found" }, 404);

    const user = await usersRepository.findOneUserByIdWithRoles(manager_id);

    if (!user) throw new HttpError({ manager_id: "invalid manager_id" }, 400);

    if (user.role?.role_name != RoleTypes.landfillManager) throw new HttpError({ manager_id: "user must be a landfill manager" }, 400);

    const user_landfill = { user_id: manager_id, landfill_id: landfill_id };

    await models.UserLandfill_Manager.create(user_landfill);

    res.json({ message: "landfill manager added successfully" });
}

async function removeManager(req, res) {}

async function addTruckDumpingEntry(req, res) {}

export default {
    createLanfill,
    updateLanfill,
    addManager,
    removeManager,
    addTruckDumpingEntry,
};
