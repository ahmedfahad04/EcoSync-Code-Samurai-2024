import { models, Op } from "../../configs/mysql.js";
import { roleConstants } from "../rbac/constants/roles.constants.js";
import { HttpError } from "../../utils/HttpError.js";
import usersRepository from "../users/users.repository.js";
import stsRepository from "./sts.repository.js";

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

async function findOneSts(req, res) {
    const { sts_id } = req.params;
    let sts = await models.STS.findByPk(sts_id);

    if (!sts) throw new HttpError({ message: "sts not found" }, 400);

    sts = sts.toJSON();
    sts.gps_coordinate = JSON.parse(sts.gps_coordinate);

    res.json(sts);
}

async function findAllSts(req, res) {
    let sts = await models.STS.findAll();
    sts = sts.map((st) => {
        st.gps_coordinate = JSON.parse(st.gps_coordinate);
        return st;
    });
    res.json(sts);
}

async function findMySts(req, res) {
    const sub = req.user?.sub;
    let sts = await models.STS.findAll({
        include: {
            model: models.User,
            through: {
                model: models.UserSTS_Manager,
                where: {
                    user_id: sub || "user_id",
                },
                attributes: [],
            },
            attributes: [],
            required: true,
        },
    });
    sts = sts.map((st) => {
        st.gps_coordinate = JSON.parse(st.gps_coordinate);
        return st;
    });
    res.json(sts);
}

async function updateSts(req, res) {
    const { sts_id } = req.params;
    const stsDto = req.body;

    const sts = await models.STS.findByPk(sts_id);
    if (!sts) throw new HttpError({ message: "sts not found" });

    if (sts.sts_name == stsDto.sts_name) delete stsDto.sts_name;

    if (stsDto.sts_name) {
        const exist = await models.STS.findOne({ where: { sts_name: stsDto.sts_name } });
        if (exist) throw new HttpError({ sts_name: "sts_name already exist" }, 400);
    }

    if (stsDto.gps_coordinate) stsDto.gps_coordinate = JSON.stringify(stsDto.gps_coordinate);

    await models.STS.update(stsDto, { where: { sts_id } });

    res.json({ message: "sts updated successfully" });
}

async function deleteSts(req, res) {
    const { sts_id } = req.params;

    await models.STS.destroy({ where: { sts_id } });

    res.json({ message: "sts deleted successfully" });
}

async function findAllStsManager(req, res) {
    const { sts_id } = req.params;
    const sts = await models.STS.findByPk(sts_id);
    if (!sts) throw new HttpError({ message: "sts not found" }, 404);

    let managers = await models.User.findAll({
        include: {
            model: models.STS,
            through: {
                model: models.UserSTS_Manager,
                attributes: [],
                where: { sts_id },
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

    if (user.role?.role_name != roleConstants.STSManager)
        throw new HttpError({ manager_id: "user must be a sts manager" }, 400);

    const user_sts = { user_id: manager_id, sts_id: sts_id };

    await models.UserSTS_Manager.create(user_sts);

    res.json({ message: "sts manager added successfully" });
}

async function removeManager(req, res) {
    const { sts_id, manager_id } = req.params;
    await models.UserSTS_Manager.destroy({ where: { sts_id, user_id: manager_id } });
    res.json({ message: "sts manager removed successfully" });
}

async function addVehicleToSTS(req, res) {
    const { sts_id } = req.params;
    const { vehicle_id } = req.body;

    const sts = await models.STS.findByPk(sts_id);
    if (!sts) throw new HttpError({ sts_id: "sts not found" }, 404);

    const vehicle = await models.Vehicle.findByPk(vehicle_id);
    if (!vehicle) throw new HttpError({ vehicle_id: "vehicle not found" }, 404);

    await models.Vehicle.update({ sts_id }, { where: { vehicle_id } });

    res.json({ message: "vehicle added successfully" });
}

async function findAllVehicleOfSts(req, res) {
    const { sts_id } = req.params;
    const vehicles = await models.Vehicle.findAll({ where: { sts_id } });
    res.json(vehicles);
}

async function removeVehicleFromSts(req, res) {
    const { sts_id, vehicle_id } = req.params;

    const vehicle = await models.Vehicle.findByPk(vehicle_id);
    if (!vehicle) throw new HttpError({ vehicle_id: "vehicle not found" }, 404);

    if (vehicle.sts_id != sts_id) throw new HttpError({ message: "vehicle not assigned to this sts" }, 400);

    await models.Vehicle.update({ sts_id: null }, { where: { vehicle_id } });

    res.json({ message: "vehicle has been removed successfully" });
}

async function addTripEntry(req, res) {
    const { sts_id } = req.params;
    const entryDto = req.body;

    const sts = await models.STS.findByPk(sts_id);
    if (!sts) throw new HttpError({ sts_id: "sts not found" }, 404);

    const vehicle = await models.Vehicle.findByPk(entryDto.vehicle_id);
    if (!vehicle) throw new HttpError({ vehicle_id: "vehicle not found" }, 404);

    // validate if vehicle is belongs to this sts or not
    if (vehicle.sts_id != sts_id) throw new HttpError({ vehicle_id: "vehicle not belongs to this sts" }, 400);

    if (entryDto.waste_volume > vehicle.capacity)
        throw new HttpError({ waste_volume: `waste volume exceeds vehicle capacity: ${vehicle.capacity} tons` }, 400);

    const count = await stsRepository.countTotalTrip(entryDto.vehicle_id, entryDto.sts_departure_time);
    if (count >= 3) throw new HttpError({ vehicle_id: "a vehicle can have maximum of 3 trips per day" }, 400);

    const isTripNumberExist = await stsRepository.isTripNumberExistForCurrentDay(
        entryDto.vehicle_id,
        entryDto.sts_departure_time,
        entryDto.trip_number
    );
    if (isTripNumberExist) throw new HttpError({ trip_number: "trip number already exists for today" }, 400);

    const landfill = await models.Landfill.findByPk(entryDto.landfill_id);
    if (!landfill) throw new HttpError({ landfill_id: "landfill not found" }, 404);

    entryDto.sts_id = sts_id;
    let departureEntry = await models.TripEntry.create(entryDto);
    departureEntry = departureEntry.toJSON();

    res.status(201).json(departureEntry);
}

async function findAllTripEntryOfSts(req, res) {
    const { sts_id } = req.params;

    let { page = 1, limit = 10, landfill_name, vehicle_number, sort = "createdAt", order = "DESC" } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const includeLandfill = {
        model: models.Landfill,
    };
    if (landfill_name) {
        includeLandfill.where = {
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
            sts_id,
        },
        include: [includeLandfill, includeVehicle],
        offset: (page - 1) * limit,
        limit: limit,
        order: [[sort, order]],
    });

    entries = entries.map((entry) => {
        const en = entry.toJSON();
        en.landfill.gps_coordinate = JSON.parse(en.landfill.gps_coordinate);
        return en;
    });

    res.status(200).json(entries);
}

export default {
    createSts,
    findOneSts,
    findAllSts,
    findMySts,
    updateSts,
    deleteSts,
    findAllStsManager,
    addManager,
    removeManager,
    addVehicleToSTS,
    findAllVehicleOfSts,
    removeVehicleFromSts,
    addTripEntry,
    findAllTripEntryOfSts,
};
