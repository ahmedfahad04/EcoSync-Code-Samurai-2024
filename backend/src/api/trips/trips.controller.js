import { models, Op } from "../../configs/mysql.js";
import { HttpError } from "../../utils/HttpError.js";

async function findAllTripEntry(req, res) {
    let {
        page = 1,
        limit = 10,
        sts_name,
        landfill_name,
        vehicle_number,
        arrival_time = "1800-04-28T09:23:54.512Z",
        departure_time = "9026-04-28T09:23:54.512Z",
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const includeSTS = {
        model: models.STS,
    };
    if (sts_name) {
        includeSTS.where = {
            sts_name: {
                [Op.like]: `%${sts_name}%`,
            },
        };
    }

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
            arrival_time: {
                [Op.gte]: arrival_time,
            },
            departure_time: {
                [Op.lte]: departure_time,
            },
        },
        include: [includeSTS, includeLandfill, includeVehicle],
        offset: (page - 1) * limit,
        limit: limit,
    });

    entries = entries.map((entry) => {
        const en = entry.toJSON();
        en.sts.gps_coordinate = JSON.parse(en.sts.gps_coordinate);
        en.landfill.gps_coordinate = JSON.parse(en.landfill.gps_coordinate);
        return en;
    });

    res.status(200).json(entries);
}

async function findOneTripEntry(req, res) {
    const { dumping_id } = req.params;
    let entry = await models.TripEntry.findByPk(dumping_id, {
        include: [
            {
                model: models.STS,
            },
            {
                model: models.Landfill,
            },
            {
                model: models.Vehicle,
            },
        ],
    });

    if (!entry) throw new HttpError({ message: "No entry found" }, 404);

    entry = entry.toJSON();
    entry.sts.gps_coordinate = JSON.parse(entry.sts.gps_coordinate);
    entry.landfill.gps_coordinate = JSON.parse(entry.landfill.gps_coordinate);

    res.json(entry);
}

async function updateTripEntry(req, res) {
    res.json("update not implemented");
}

async function generateBill(req, res) {
    const { dumping_id } = req.params;

    const dumpingEntry = await models.TripEntry.findByPk(dumping_id);

    if (!dumpingEntry) throw new HttpError({ message: "invalid dumping entry" }, 404);

    const vehicle = await models.Vehicle.findByPk(dumpingEntry.vehicle_id);
    const landfill = await models.Landfill.findByPk(dumpingEntry.landfill_id);
    const sts = await models.STS.findByPk(dumpingEntry.sts_id);

    const cpk_journey =
        vehicle.cpk_unloaded + (dumpingEntry.waste_volume / vehicle.capacity) * (vehicle.cpk_loaded - vehicle.cpk_unloaded);

    const result = {
        waste_volume: dumpingEntry.waste_volume,
        distance: 20,
        cost_per_kilo: cpk_journey,
        total_cost: cpk_journey * 20,
        vehicle: {
            vehicle_number: vehicle.vehicle_number,
            type: vehicle.type,
            capacity: vehicle.capacity,
            cpk_loaded: vehicle.cpk_loaded,
            cpk_unloaded: vehicle.cpk_unloaded,
        },
        sts_name: sts.toJSON().sts_name,
        landfill_name: landfill.toJSON().landfill_name,
        createdAt: new Date().toString(),
    };

    res.json(result);
}

async function deleteTripEntry(req, res) {
    const { dumping_id } = req.params;
    await models.TripEntry.destroy({ where: { dumping_id } });
    res.json({ message: "dumping entry deleted successfully" });
}

async function addDumpingEntry(req, res) {
    
}

export default {
    findAllTripEntry,
    findOneTripEntry,
    updateTripEntry,
    deleteTripEntry,
    generateBill,
    addDumpingEntry,
};