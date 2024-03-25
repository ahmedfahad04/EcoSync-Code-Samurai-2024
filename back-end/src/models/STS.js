"use strict";

export default (options) => {
    const { sequelize, DataTypes, Sequelize } = options;
    const STS = sequelize.define("sts", {
        sts_id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        sts_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gps_coordinate: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "GPS Coordinates will be stored as a array of number, [latitude, longitude]",
        },
        ward_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: "Capacity in tons",
        },
        sts_manager_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: "users",
                key: "user_id",
            },
        },
    });

    STS.associate = (models) => {};

    return STS;
};
