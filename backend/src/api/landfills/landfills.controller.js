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

async function findOneLandfill(req, res) {
    const { landfill_id } = req.params;
    let landfill = await models.Landfill.findByPk(landfill_id);
    if (!landfill) throw new HttpError({ message: "landfill not found" }, 404);

    landfill = landfill.toJSON();
    landfill.gps_coordinate = JSON.parse(landfill.gps_coordinate);

    res.status(200).json(landfill);
}

async function findAllLandfill(req, res) {
    let landfills = await models.Landfill.findAll();
    landfills = landfills.map((landfill) => {
        const site = landfill.toJSON();
        site.gps_coordinate = JSON.parse(site.gps_coordinate);
        return site;
    });
    res.status(200).json(landfills);
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

async function findAllLandfillManager(req, res) {
    const { landfill_id } = req.params;
    const landfill = await models.Landfill.findByPk(landfill_id);
    if (!landfill) throw new HttpError({ message: "landfill not found" }, 404);

    let managers = await models.User.findAll({
        include: {
            model: models.Landfill,
            through: {
                model: models.UserLandfill_Manager,
                attributes: [],
                where: { landfill_id: landfill_id },
            },
            attributes: [],
            required: true,
        },
    });

    managers = managers.map((manager) => {
        const m = manager.toJSON();
        delete m.password;
        return m;
    });

    res.json(managers);
}

async function removeManager(req, res) {
    const { landfill_id, manager_id } = req.params;

    await models.UserLandfill_Manager.destroy({ where: { landfill_id, user_id: manager_id } });

    res.json({ message: "landfill manager removed successfully" });
}

async function addDumpingEntry(req, res) {
    const { landfill_id } = req.params;
    const entryDto = req.body;

    const landfill = await models.Landfill.findByPk(landfill_id);
    if (!landfill) throw new HttpError({ landfill_id: "landfill not found" }, 404);

    const vehicle = await models.Vehicle.findByPk(entryDto.vehicle_id);
    if (!vehicle) throw new HttpError({ vehicle_id: "vehicle not found" }, 404);

    if (entryDto.waste_volume > vehicle.capacity)
        throw new HttpError({ waste_volume: `waste volume exceeds vehicle capacity: ${vehicle.capacity} tons` }, 400);

    const sts = await models.STS.findByPk(entryDto.sts_id);
    if (!sts) throw new HttpError({ sts_id: "sts not found" }, 404);

    entryDto.landfill_id = landfill_id;
    let dumpingEntry = await models.TruckDumpingEntry.create(entryDto);
    dumpingEntry = dumpingEntry.toJSON();

    res.status(201).json(dumpingEntry);
}

async function attachVehicleToLandfill(req, res) {
    const { landfill_id } = req.params;
    const { vehicle_id } = req.body;

    const landfill = await models.Landfill.findByPk(landfill_id);
    if (!landfill) throw new HttpError({ landfill_id: "landfill not found" }, 404);

    const vehicle = await models.Vehicle.findByPk(vehicle_id);
    if (!vehicle) throw new HttpError({ vehicle_id: "vehicle not found" }, 404);

    // check if attached to other landfill or not
    if (vehicle.landfill_id) {
        throw new HttpError({ vehicle_id: "vehicle already attached to a landfill" }, 400);
    }

    await models.Vehicle.update({ landfill_id }, { where: { vehicle_id } });

    res.json({ message: "vehicle attached successfully" });
}

async function removeVehicleFromLandfill(req, res) {}

export default {
    createLanfill,
    findOneLandfill,
    findAllLandfill,
    updateLanfill,
    addManager,
    findAllLandfillManager,
    removeManager,
    addDumpingEntry,
    attachVehicleToLandfill,
    removeVehicleFromLandfill,
};
