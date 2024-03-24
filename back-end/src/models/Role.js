"use strict";

export default (options) => {
    const { sequelize, DataTypes, Sequelize } = options;
    const Role = sequelize.define("roles", {
        role_id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        role_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isIn: [["admin", "user"]],
            },
        },
    });

    Role.associate = (models) => {
        Role.belongsToMany(models.User, {
            through: models.UserRole,
            foreignKey: "role_id",
        });
    };

    return Role;
};
