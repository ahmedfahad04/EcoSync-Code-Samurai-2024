import { models, Op } from "../../configs/mysql.js";

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

export default {
    findAllDepartureEntry,
};
