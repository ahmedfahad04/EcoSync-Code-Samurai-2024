"use strict";

export default (options) => {
    const { sequelize, DataTypes, Sequelize } = options;
    const User = sequelize.define("users", {
        user_id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profile_url: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role_id: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: "roles",
                key: "role_id",
            },
        },
    });

    User.associate = (models) => {
        User.belongsTo(models.Role, {
            foreignKey: "role_id",
        });

        User.belongsToMany(models.STS, {
            through: models.UserSTS_Manager,
            foreignKey: "user_id"
        });

        User.belongsToMany(models.Landfill, {
            through: models.UserLandfill_Manager,
            foreignKey: "user_id"
        });
    };

    return User;
};
