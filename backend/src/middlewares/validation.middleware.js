import { Joi, formatError } from "../utils/Joi.js";

export const schemaValidator = (schema, location = "body") => {
    return async (req, res, next) => {
        try {
            if (!Joi.isSchema(schema)) {
                console.log("Invalid joi schema");
                return res.status(500).json({ message: "Internal Server Error" });
            }
            const dto = req[location];

            if(location === "body" && Object.keys(dto).length == 0) {
                return res.status(400).json({"message": "body cannot be empty"});
            }

            const { error } = schema.validate(dto);
            if (error) return res.status(400).json(formatError(error));
            else next();
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "An error occurred while validating the schema" });
        }
    };
};