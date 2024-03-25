"use strict";

export const VehicleTypes = {
    open_truck: "Open Truck",
    dump_truck: "Dump Truck",
    compactor: "Compactor",
    container_carrier: "Container Carrier"
}

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
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [[Object.values(VehicleTypes)]],
            },
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isIn: [VehicleCapacities],
            },
            comment: "capacity in tons"
        },
    });

    Vehicle.associate = (models) => {
       
    };

    return Vehicle;
};