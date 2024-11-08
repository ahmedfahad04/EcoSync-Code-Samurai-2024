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
            unique: true,
            comment: "location name of sts",
        },
        gps_coordinate: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "GPS Coordinates will be stored as a array of number, [latitude, longitude]",
        },
        ward_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        capacity: {
            type: DataTypes.FLOAT,
            allowNull: false,
            comment: "Capacity in tons",
        },
        current_waste_volume: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "Update current waste after each departure? or dumping?"
        },
    });

    STS.associate = (models) => {
        STS.belongsToMany(models.User, {
            through: models.UserSTS_Manager,
            foreignKey: "sts_id",
        });

        STS.hasMany(models.Vehicle, {
            foreignKey: "sts_id",
        });

        STS.hasMany(models.TripEntry, {
            foreignKey: "sts_id",
        });
    };

    return STS;
};
