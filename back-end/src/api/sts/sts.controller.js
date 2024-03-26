import { models } from "../../configs/mysql.js";
import { HttpError } from "../../utils/HttpError.js";

async function createSts(req, res) {
    const stsDto = req.body;

    const exist = await models.STS.findOne({ where: { sts_name: stsDto.sts_name } });
    if (exist) {
        throw new HttpError({ sts_number: "sts name already exists" }, 400);
    }

    stsDto.gps_coordinate = JSON.stringify(stsDto.gps_coordinate);

    let sts = await models.STS.create(stsDto);
    sts = sts.toJSON();

    res.status(201).json(sts);
}
async function updateSts(req, res) {}
async function addManager(req, res) {}
async function removeManager(req, res) {}

export default {
    createSts,
    updateSts,
    addManager,
    removeManager,
};
