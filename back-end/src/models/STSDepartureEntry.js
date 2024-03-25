"use strict";

export default (options) => {
    const { sequelize, DataTypes, Sequelize } = options;
    const STSDepatureEntry = sequelize.define("sts_departure_entry", {
        departure_id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        sts_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "sts",
                key: "sts_id",
            },
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
        waste_volume: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        arrival_time: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        departure_time: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
    });

    STSDepatureEntry.associate = (models) => {};

    return STSDepatureEntry;
};
