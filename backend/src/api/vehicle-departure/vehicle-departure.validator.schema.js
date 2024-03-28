import { Joi } from "../../utils/Joi.js";

export const findAllDepartureEntryQuerySchema = Joi.object({
    page: Joi.number().integer().positive().optional(),
    limit: Joi.number().integer().positive().optional(),
    vehicle_number: Joi.string().trim().optional(),
    sts_name: Joi.string().trim().optional(),
    landfill_name: Joi.string().trim().optional(),
    sort: Joi.string().trim().valid("createdAt").optional(),
    order: Joi.string().trim().valid("ASC", "DESC").optional(),
    arrival_time: Joi.date().optional(),
    departure_time: Joi.date().optional(),
    waste_volume_start: Joi.number().optional(),
    waste_volume_end: Joi.number().optional(),
}).required();