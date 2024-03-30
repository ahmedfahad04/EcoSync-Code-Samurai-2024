import { models } from "../../configs/mysql.js";
import { HttpError } from "../../utils/HttpError.js";
import { roleConstants } from "../rbac/constants/roles.constants.js";
import usersRepository from "../users/users.repository.js";

async function createLandfill(req, res) {
    const landfillDto = req.body;

    const existLandfill = await models.Landfill.findOne({ where: { landfill_name: landfillDto.landfill_name } });
    if (existLandfill) throw new HttpError({ landfill_name: "landfill already exist" });

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

async function findMyLandfills(req, res) {
    const sub = req.user?.sub;
    let landfills = await models.Landfill.findAll({
        include: {
            model: models.User,
            through: {
                model: models.UserLandfill_Manager,
                where: {
                    user_id: sub || "user_id",
                },
                attributes: [],
            },
            attributes: [],
            required: true,
        },
    });
    landfills = landfills.map((landfill) => {
        const site = landfill.toJSON();
        site.gps_coordinate = JSON.parse(site.gps_coordinate);
        return site;
    });
    res.status(200).json(landfills);
}

async function updateLandfill(req, res) {
    const { landfill_id } = req.params;
    const landfillDto = req.body;

    const landfill = await models.Landfill.findByPk(landfill_id);
    if (!landfill) throw new HttpError({ message: "landfill not found" });

    if (landfill.landfill_name == landfillDto.landfill_name) delete landfillDto.landfill_name;

    if (landfillDto.landfill_name) {
        const exist = await models.Landfill.findOne({ where: { landfill_name: landfillDto.landfill_name } });
        if (exist) throw new HttpError({ landfill_name: "landfill_name already exist" }, 400);
    }

    await models.Landfill.update(landfillDto, { where: { landfill_id } });

    res.json({ message: "landfill updated successfully" });
}

async function deleteLandfill(req, res) {
    const { landfill_id } = req.params;
    await models.Landfill.destroy({ where: { landfill_id } });
    res.json({ message: "landfill deleted successfully" });
}

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

    if (user.role?.role_name != roleConstants.LandfillManager)
        throw new HttpError({ manager_id: "user must be a landfill manager" }, 400);

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

async function findAllTripOfLandfill(req, res) {
    const { landfill_id } = req.params;

    let { page = 1, limit = 10, sts_name, vehicle_number, sort = "createdAt", order = "DESC" } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const includeSTS = {
        model: models.STS,
    };
    if (sts_name) {
        includeSTS.where = {
            landfill_name: {
                [Op.like]: `%${landfill_name}%`,
            },
        };
    }

    const includeVehicle = {
        model: models.Vehicle,
    };
    if (vehicle_number) {
        includeVehicle.where = {
            vehicle_number: {
                [Op.like]: `%${vehicle_number}%`,
            },
        };
    }

    let entries = await models.TripEntry.findAll({
        where: {
            landfill_id,
        },
        include: [includeSTS, includeVehicle],
        offset: (page - 1) * limit,
        limit: limit,
        order: [[sort, order]],
    });

    entries = entries.map((entry) => {
        const en = entry.toJSON();

        en.sts = en.st;
        delete en.st;

        en.sts.gps_coordinate = JSON.parse(en.sts.gps_coordinate);
        return en;
    });

    res.status(200).json(entries);
}

export default {
    createLandfill,
    findOneLandfill,
    findAllLandfill,
    findMyLandfills,
    updateLandfill,
    deleteLandfill,
    addManager,
    findAllLandfillManager,
    removeManager,
    attachVehicleToLandfill,
    removeVehicleFromLandfill,
    findAllTripOfLandfill,
};
