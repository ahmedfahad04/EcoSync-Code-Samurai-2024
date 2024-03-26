import { models } from "../../configs/mysql.js";
import { HttpError } from "../../utils/HttpError.js";

async function createVehicle(req, res) {
    const vehicleDto = req.body;

    const existed = await models.Vehicle.findOne({ where: { vehicle_number: vehicleDto.vehicle_number } });
    if (existed) throw new HttpError({ vehicle_number: "vehicle already exists" });

    let vehicle = await models.Vehicle.create(vehicleDto);
    vehicle = vehicle.toJSON();

    res.status(201).json(vehicle);
}

export default {
    createVehicle,
};
