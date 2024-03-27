import { models } from "../../configs/mysql.js";
import { HttpError } from "../../utils/HttpError.js";

async function createLanfill(req, res) {
    const landfillDto = req.body;

    const exists = await models.Landfill.findOne({ where: { landfill_name: landfillDto.landfill_name } });
    if (exists) throw new HttpError({ landfill_name: "landfill already exists" });

    let newLandfill = await models.Landfill.create({ ...landfillDto, gps_coordinate: JSON.stringify(landfillDto.gps_coordinate) });
    newLandfill = newLandfill.toJSON();
    newLandfill.gps_coordinate = landfillDto.gps_coordinate;

    res.status(201).json(newLandfill);
}

async function updateLanfill(req, res) {}

async function addManager(req, res) {}

async function removeManager(req, res) {}

async function addTruckDumpingEntry(req, res) {}

export default {
    createLanfill,
    updateLanfill,
    addManager,
    removeManager,
    addTruckDumpingEntry,
};
