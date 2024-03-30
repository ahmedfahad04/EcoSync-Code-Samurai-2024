import { models } from "../../configs/mysql.js";
import { HttpError } from "../../utils/HttpError.js";
import { VehicleTypes } from "./constants/vehicle.constants.js";

async function createVehicle(req, res) {
    const vehicleDto = req.body;

    const existed = await models.Vehicle.findOne({ where: { vehicle_number: vehicleDto.vehicle_number } });
    if (existed) throw new HttpError({ vehicle_number: "vehicle already exists" }, 400);

    if (vehicleDto.type == VehicleTypes.container_carrier) {
        if (vehicleDto.capacity != 15) throw new HttpError({ capacity: "capacity must be 15 tons" });
    } else {
        if (vehicleDto.capacity == 15) throw new HttpError({ capacity: "capacity cannot be 15 tons" });
    }

    let vehicle = await models.Vehicle.create(vehicleDto);
    vehicle = vehicle.toJSON();

    res.status(201).json(vehicle);
}

async function findAllVehicle(req, res) {
    const vehicles = await models.Vehicle.findAll();
    res.json(vehicles);
}

async function findAllAvailableVehicle() {}

async function updateVehicle(req, res) {
    const { vehicle_id } = req.params;
    const vehicleDto = req.body;

    const vehicle = await models.Vehicle.findByPk(vehicle_id);
    if (!vehicle) throw new HttpError({ message: "vehicle not found" }, 404);

    if (vehicle.vehicle_number == vehicleDto.vehicle_number) {
        delete vehicleDto.vehicle_number;
    }

    if (vehicleDto.vehicle_number) {
        const existed = await models.Vehicle.findOne({ where: { vehicle_number: vehicleDto.vehicle_number } });
        if (existed) throw new HttpError({ vehicle_number: "vehicle number already exists" }, 400);
    }

    await models.Vehicle.update(vehicleDto, { where: { vehicle_id } });

    res.json({ message: "vehicle updated successfully" });
}

async function deleteVehicle(req, res) {
    const { vehicle_id } = req.params;

    const vehicle = await models.Vehicle.findByPk(vehicle_id);
    if (!vehicle) throw new HttpError({ message: "vehicle not found" }, 404);

    await models.Vehicle.destroy({ where: { vehicle_id } });

    res.json({ message: "vehicle deleted successfully" });
}

export default {
    createVehicle,
    findAllVehicle,
    findAllAvailableVehicle,
    updateVehicle,
    deleteVehicle,
};
