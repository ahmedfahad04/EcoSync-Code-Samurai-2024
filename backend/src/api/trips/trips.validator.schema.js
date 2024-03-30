import { Joi } from "../../utils/Joi.js";

export const findAllTripEntryQuerySchema = Joi.object({
    page: Joi.number().integer().positive().optional(),
    limit: Joi.number().integer().positive().optional(),
    vehicle_number: Joi.string().trim().optional(),
    sts_name: Joi.string().trim().optional(),
    landfill_name: Joi.string().trim().optional(),
    sort: Joi.string().trim().valid("createdAt").optional(),
    order: Joi.string().trim().valid("ASC", "DESC").optional(),
    sts_arrival_time: Joi.date().optional(),
    sts_departure_time: Joi.date().optional(),
    waste_volume_start: Joi.number().optional(),
    waste_volume_end: Joi.number().optional(),
}).required();

export const updateTripWithDumpingEntrySchema = Joi.object({
    landfill_arrival_time: Joi.date().required(),
    landfill_dumping_time: Joi.date().required()
});