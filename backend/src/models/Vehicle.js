"use strict";

import { VehicleTypes } from "../api/vehicles/constants/vehicle.constants.js";

export default (options) => {
    const { sequelize, DataTypes, Sequelize } = options;
    const Vehicle = sequelize.define("vehicles", {
        vehicle_id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        vehicle_number: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            comment: "Vehicle registration number",
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [Object.values(VehicleTypes)],
            },
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "capacity in tons",
        },
        cpk_loaded: {
            type: DataTypes.FLOAT,
            comment: "Fuel cost per kilometer - fully loaded",
        },
        cpk_unloaded: {
            type: DataTypes.FLOAT,
            comment: "Fuel cost per kilometer - unloaded",
        },
        sts_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: "sts",
                key: "sts_id",
            },
            comment: "A number of trucks with varying load capacity are attached to each sts",
        },
    });

    Vehicle.associate = (models) => {
        Vehicle.belongsTo(models.STS, {
            foreignKey: "sts_id",
        });

        Vehicle.hasMany(models.TripEntry, {
            foreignKey: "vehicle_id",
        });
    };

    return Vehicle;
};
