"use strict";

export default (options) => {
    const { sequelize, DataTypes, Sequelize } = options;
    const TruckDumpingEntry = sequelize.define("truck_dumping_entry", {
        dumping_id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        landfill_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "landfills",
                key: "landfill_id",
            },
        },
        vehicle_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "vehicles",
                key: "vehicle_id",
            },
        },
        sts_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "sts",
                key: "sts_id",
            },
        },
        waste_volume: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        arrival_time: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        departure_time: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    });

    TruckDumpingEntry.associate = (models) => {};

    return TruckDumpingEntry;
};
