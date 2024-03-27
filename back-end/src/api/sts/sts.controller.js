import { models } from "../../configs/mysql.js";
import { RoleTypes } from "../../models/Role.js";
import { HttpError } from "../../utils/HttpError.js";
import usersRepository from "../users/users.repository.js";

async function createSts(req, res) {
    const stsDto = req.body;

    const exist = await models.STS.findOne({ where: { sts_name: stsDto.sts_name } });
    if (exist) {
        throw new HttpError({ sts_name: "sts name already exists" }, 400);
    }

    let sts = await models.STS.create({ ...stsDto, gps_coordinate: JSON.stringify(stsDto.gps_coordinate) });
    sts = sts.toJSON();
    sts.gps_coordinate = stsDto.gps_coordinate;

    res.status(201).json(sts);
}
async function updateSts(req, res) {}

async function addManager(req, res) {
    const { sts_id } = req.params;
    const { manager_id } = req.body;

    // user cannot be manager of multiple sts
    const alreadyManagerOfAnySts = await models.UserSTS_Manager.findOne({ where: { user_id: manager_id } });
    if (alreadyManagerOfAnySts) throw new HttpError({ manager_id: "already assigned to an sts" });

    const sts = await models.STS.findByPk(sts_id);

    if (!sts) throw new HttpError({ message: "sts not found" }, 404);

    const user = await usersRepository.findOneUserByIdWithRoles(manager_id);

    if (!user) throw new HttpError({ manager_id: "invalid manager_id" }, 400);

    if (user.role?.role_name != RoleTypes.stsManager) throw new HttpError({ manager_id: "user must be a sts manager" }, 400);

    const user_sts = { user_id: manager_id, sts_id: sts_id };

    await models.UserSTS_Manager.create(user_sts);

    res.json({ message: "sts manager added successfully" });
}

async function removeManager(req, res) {}

async function addVehicleDepartureEntry(req, res) {
    const { sts_id } = req.params;
    const entryDto = req.body;

    const sts = await models.STS.findByPk(sts_id);
    if (!sts) throw new HttpError({ sts_id: "sts not found" }, 404);

    const vehicle = await models.Vehicle.findByPk(entryDto.vehicle_id);
    if (!vehicle) throw new HttpError({ vehicle_id: "vehicle not found" }, 404);

    if (entryDto.waste_volume > vehicle.capacity) throw new HttpError({ waste_volume: `waste volume exceeds vehicle capacity: ${vehicle.capacity} tons` }, 400);

    const landfill = await models.Landfill.findByPk(entryDto.landfill_id);
    if (!landfill) throw new HttpError({ landfill_id: "landfill not found" }, 404);

    entryDto.sts_id = sts_id;
    let departureEntry = await models.STSDepartureEntry.create(entryDto);
    departureEntry = departureEntry.toJSON();

    res.status(201).json(departureEntry);
}

export default {
    createSts,
    updateSts,
    addManager,
    removeManager,
    addVehicleDepartureEntry,
};
