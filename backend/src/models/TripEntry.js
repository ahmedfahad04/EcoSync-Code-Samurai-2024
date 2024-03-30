"use strict";

export default (options) => {
    const { sequelize, DataTypes, Sequelize } = options;
    const TripEntry = sequelize.define("trip_entries", {
        trip_id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
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
        landfill_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "landfills",
                key: "landfill_id",
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
        departure_time: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: "Time when leaving sts with waste",
        },
        dumping_time: {
            type: DataTypes.DATE,
            allowNull: true,
            comment: "Time when dumping waste in landfill. There would be value only after dumping, by Landfill manager",
        },
        is_bill_paid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            comment: "Can be true only after dumping",
        },
    });

    TripEntry.associate = (models) => {
        TripEntry.belongsTo(models.STS, {
            foreignKey: "sts_id",
        });
        TripEntry.belongsTo(models.Landfill, {
            foreignKey: "landfill_id",
        });
        TripEntry.belongsTo(models.Vehicle, {
            foreignKey: "vehicle_id",
        });
    };

    return TripEntry;
};
