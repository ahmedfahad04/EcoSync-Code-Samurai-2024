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
    });

    STS.associate = (models) => {
        STS.belongsToMany(models.User, {
            through: models.UserSTS_Manager,
            foreignKey: "sts_id",
        });

        STS.hasMany(models.Vehicle, {
            foreignKey: "sts_id",
        });

        STS.hasMany(models.STSDepartureEntry, {
            foreignKey: "sts_id",
        });

        STS.hasMany(models.TruckDumpingEntry, {
            foreignKey: "sts_id",
        });
    };

    return STS;
};
