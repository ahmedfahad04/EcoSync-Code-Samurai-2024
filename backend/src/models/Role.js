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
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    Role.associate = (models) => {
        Role.hasMany(models.User, {
            foreignKey: "role_id",
        });

        Role.belongsToMany(models.Permission, {
            through: models.RolePermission,
            foreignKey: "role_id",
        });
    };

    return Role;
};
