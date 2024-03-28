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
        trip_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isIn: [[1, 2, 3]],
            },
            comment: "Trip number for the specific truck (1 to 3, indicating the order within the day).",
        },
        arrival_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        departure_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });

    STSDepatureEntry.associate = (models) => {
        STSDepatureEntry.belongsTo(models.STS, {
            foreignKey: "sts_id",
        });
        STSDepatureEntry.belongsTo(models.Landfill, {
            foreignKey: "landfill_id",
        });
        STSDepatureEntry.belongsTo(models.Vehicle, {
            foreignKey: "vehicle_id",
        });
    };

    return STSDepatureEntry;
};
