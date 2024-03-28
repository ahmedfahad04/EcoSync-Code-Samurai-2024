"use strict";

export const VehicleTypes = {
    open_truck: "Open Truck",
    dump_truck: "Dump Truck",
    compactor: "Compactor",
    container_carrier: "Container Carrier",
};

export const VehicleCapacities = [3, 5, 7];

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
            validate: {
                isIn: [VehicleCapacities],
            },
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
        landfill_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: "landfills",
                key: "landfill_id",
            },
            comment: "A number of trucks with varying load capacity are attached to each landfill",
        },
    });

    Vehicle.associate = (models) => {
        Vehicle.belongsTo(models.Landfill, {
            foreignKey: "landfill_id",
        });
    };

    return Vehicle;
};
