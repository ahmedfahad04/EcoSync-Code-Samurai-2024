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
            unique: true,
        },
        gps_coordinate: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: "GPS Coordinates will be stored as a array of number, [latitude, longitude]",
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        opening_time: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        cosing_time: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    });

    Landfill.associate = (models) => {
        Landfill.belongsToMany(models.User, {
            through: models.UserLandfill_Manager,
            foreignKey: "landfill_id",
        });
    };

    return Landfill;
};
