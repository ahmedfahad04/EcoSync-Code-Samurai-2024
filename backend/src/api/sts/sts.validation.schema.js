import { Joi } from "../../utils/Joi.js";

export const createStsSchema = Joi.object({
    sts_name: Joi.string().required(),
    gps_coordinate: Joi.array().items(Joi.number()).length(2).required(),
    ward_number: Joi.string().required(),
    capacity: Joi.number().required(),
});

export const updateStsSchema = Joi.object({
    sts_name: Joi.string().optional(),
    gps_coordinate: Joi.array().items(Joi.number()).length(2).optional(),
    ward_number: Joi.string().optional(),
    capacity: Joi.number().optional(),
});

export const addManagerSchema = Joi.object({
    manager_id: Joi.string().trim().required().max(100),
});

export const addVehicleDepartureEntrySchema = Joi.object({
    vehicle_id: Joi.string().trim().required(),
    landfill_id: Joi.string().trim().required(),
    waste_volume: Joi.number().required(),
    trip_number: Joi.number().integer().required().valid(1, 2, 3),
    sts_arrival_time: Joi.date().required(),
    sts_departure_time: Joi.date().required()
});