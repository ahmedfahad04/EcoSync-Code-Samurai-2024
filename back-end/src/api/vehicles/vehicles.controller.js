import { models } from "../../configs/mysql.js";
import { HttpError } from "../../utils/HttpError.js";

async function createVehicle(req, res) {
    const vehicleDto = req.body;

    const existed = await models.Vehicle.findOne({ where: { vehicle_number: vehicleDto.vehicle_number } });
    if (existed) throw new HttpError({ vehicle_number: "vehicle already exists" }, 400);

    let vehicle = await models.Vehicle.create(vehicleDto);
    vehicle = vehicle.toJSON();

    res.status(201).json(vehicle);
}

async function updateVehicle(req, res) {
    const { vehicle_id } = req.params;
    const vehicleDto = req.body;

    const vehicle = await models.Vehicle.findByPk(vehicle_id);
    if (!vehicle) throw new HttpError({ message: "vehicle not found" }, 404);

    if (vehicleDto.vehicle_number) {
        const existed = await models.Vehicle.findOne({ where: { vehicle_number: vehicleDto.vehicle_number } });
        if (existed) throw new HttpError({ vehicle_number: "vehicle already exists" }, 400);
    }

    await models.Vehicle.update(vehicleDto, { where: { vehicle_id } });

    res.json({ message: "vehicle updated successfully" });
}

export default {
    createVehicle,
    updateVehicle,
};
