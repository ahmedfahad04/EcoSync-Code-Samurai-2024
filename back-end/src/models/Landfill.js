"use strict";

export default (options) => {
    const { sequelize, DataTypes, Sequelize } = options;
    const Landfill = sequelize.define("landfills", {
        landfill_id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        landfill_name: {
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
        },
        landfill_manager_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: "users",
                key: "user_id",
            },
        },
    });

    Landfill.associate = (models) => {};

    return Landfill;
};
