"use strict";

export default (options) => {
    const { sequelize, DataTypes, Sequelize } = options;
    const User = sequelize.define("users", {
        user_id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    User.associate = (models) => {
        User.belongsToMany(models.Role, {
            through: models.UserRole,
            foreignKey: "user_id",
        });
    };

    return User;
};
