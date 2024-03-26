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
