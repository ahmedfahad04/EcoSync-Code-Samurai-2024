import { Joi } from "../../utils/Joi.js";
import { VehicleTypes, VehicleCapacities } from "../../models/Vehicle.js";

export const createVehicleSchema = Joi.object({
    vehicle_number: Joi.string().trim().required(),
    type: Joi.string()
        .valid(...Object.values(VehicleTypes))
        .required(),
    capacity: Joi.number()
        .valid(...VehicleCapacities)
        .required(),
    cpk_loaded: Joi.number().required(),
    cpk_unloaded: Joi.number().required(),
});
