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
        }
    });

    STS.associate = (models) => {
        STS.belongsToMany(models.User, {
            through: models.UserSTS_Manager,
            foreignKey: "sts_id"
        });
    };

    return STS;
};
