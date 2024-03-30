import { models, Op } from "../../configs/mysql.js";
import { HttpError } from "../../utils/HttpError.js";

async function findAllDepartureEntry(req, res) {
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

    let entries = await models.STSDepartureEntry.findAll({
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
        en.sts = en.st;
        delete en.st;

        en.sts.gps_coordinate = JSON.parse(en.sts.gps_coordinate);
        en.landfill.gps_coordinate = JSON.parse(en.landfill.gps_coordinate);

        return en;
    });

    res.status(200).json(entries);
}

async function findOneDepartureEntry(req, res) {
    const { departure_id } = req.params;
    let entry = await models.STSDepartureEntry.findByPk(departure_id, {
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

async function updateDepartureEntry(req, res) {
    res.json("not implemented");
}

async function deleteDepartureEntry(req, res) {
    const { departure_id } = req.params;

    await models.STSDepartureEntry.destroy({ where: { departure_id } });

    res.json({ message: "Departure entry deleted" });
}

export default {
    findAllDepartureEntry,
    findOneDepartureEntry,
    updateDepartureEntry,
    deleteDepartureEntry,
};
