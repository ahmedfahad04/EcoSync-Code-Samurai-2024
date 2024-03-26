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
    };

    return User;
};
