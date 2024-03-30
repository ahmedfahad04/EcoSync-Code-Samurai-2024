"use strict";

export const time_format = {
    regex: /^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/,
    msg: "Invalid time format. Please use HH:MM:SS",
};

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
            comment: "location name of landfill"
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
        current_waste_volume: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: "Update current waste after each departure? or dumping?"
        },
        opening_time: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "06:00:00",
            validate: {
                is: time_format.regex,
            },
        },
        closing_time: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "17:00:00",
            validate: {
                is: time_format.regex,
            },
        },
    });

    Landfill.associate = (models) => {
        Landfill.belongsToMany(models.User, {
            through: models.UserLandfill_Manager,
            foreignKey: "landfill_id",
        });
        
        Landfill.hasMany(models.TripEntry, {
            foreignKey: "landfill_id",
        });
    };

    return Landfill;
};
