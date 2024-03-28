"use strict";

export default (options) => {
    const { sequelize, DataTypes, Sequelize } = options;
    const TruckDumpingEntry = sequelize.define("truck_dumping_entries", {
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
        },
        departure_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        is_bill_paid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    });

    TruckDumpingEntry.associate = (models) => {
        TruckDumpingEntry.belongsTo(models.Landfill, {
            foreignKey: "landfill_id",
        });
        TruckDumpingEntry.belongsTo(models.Vehicle, {
            foreignKey: "vehicle_id",
        });
        TruckDumpingEntry.belongsTo(models.STS, {
            foreignKey: "sts_id",
        });
    };

    return TruckDumpingEntry;
};
