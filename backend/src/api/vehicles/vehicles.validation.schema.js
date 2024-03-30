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
    cpk_loaded: Joi.number().positive().required(),
    cpk_unloaded: Joi.number().positive().required().less(Joi.ref('cpk_loaded')),
});

export const updateVehicleSchema = Joi.object({
    vehicle_number: Joi.string().trim().optional(),
    type: Joi.string()
        .valid(...Object.values(VehicleTypes))
        .optional(),
    capacity: Joi.number()
        .valid(...VehicleCapacities)
        .optional(),
    cpk_loaded: Joi.number().positive().optional(),
    cpk_unloaded: Joi.number().positive().optional().less(Joi.ref('cpk_loaded')),
});