import { Joi } from "../../utils/Joi.js";
import { time_format } from "../../models/Landfill.js";

export const createlandfillSchema = Joi.object({
    landfill_name: Joi.string().required(),
    gps_coordinate: Joi.array().items(Joi.number()).length(2).required(),
    capacity: Joi.number().required(),
    opening_time: Joi.string().regex(time_format.regex).required(),
    closing_time: Joi.string().regex(time_format.regex).required(),
});

export const updatelandfillSchema = Joi.object({
    landfill_name: Joi.string().optional(),
    gps_coordinate: Joi.array().items(Joi.number()).length(2).optional(),
    capacity: Joi.number().optional(),
    opening_time: Joi.string().regex(time_format.regex).required(),
    closing_time: Joi.string().regex(time_format.regex).required(),
});

export const addManagerSchema = Joi.object({
    manager_id: Joi.string().trim().required().max(100),
});

export const addTruckDumpingEntrySchema = Joi.object({
    vehicle_id: Joi.string().trim().required(),
    sts_id: Joi.string().trim().required(),
    waste_volume: Joi.number().required(),
    arrival_time: Joi.date().required(),
    departure_time: Joi.date().required(),
});
